import { UserService } from '@/auth/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/auth/entities';
import { AuthSignInResponse } from '@/auth/dtos/auth-response.dto';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Profile } from 'passport-spotify';
import { BaseService } from '@/common/service/base.service';
import { CipherService } from '@/lib/services/crypto.service';
import { ConfigService } from '@nestjs/config';
import { ArtistService } from '@/artist/services/artist.service';

@Injectable()
export class AuthService extends BaseService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly cipherService: CipherService,
    private readonly configService: ConfigService,
    private readonly artistService: ArtistService,
  ) {
    super();
  }

  async checkPassword(input: {
    password: string;
    hashedPassword: string;
  }): Promise<boolean> {
    return this.cipherService.verifyHash({
      candidate: input.password,
      hash: input.hashedPassword,
    });
  }

  async generateToken(user: User): Promise<AuthSignInResponse> {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    const tokens = await this.#getTokens(payload);

    const lastLoginDate = new Date();

    await this.userService.db.update(user.id, {
      refreshToken: tokens.refreshToken,
      lastLoginDate,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        lastLoginDate,
        artist: user.artist,
      },
      ...tokens,
    };
  }

  async validateSpotifyUser(input: {
    profile: Profile;
    accessToken: string;
    refreshToken: string;
  }): Promise<User> {
    const { profile, accessToken, refreshToken } = input;

    const email = profile.emails?.[0]?.value;
    let user = await this.userService.db.findOneBy({ email });

    if (!user) {
      user = this.userService.db.create({
        email,
        spotifyAccessToken: this.cipherService.encrypt(accessToken),
        spotifyRefreshToken: this.cipherService.encrypt(refreshToken),
        firstName: profile.displayName,
        profileImageUrl: profile.photos?.[0] || '',
        lastLoginDate: new Date(),
      });

      await this.userService.db.save(user);
    }

    const existingUser = await this.userService.db.findOneOrFail({
      where: {
        email: user.email,
      },
      relations: ['artist'],
    });

    if (!existingUser.artist) {
      return this.#ensureArtist(existingUser, profile);
    }

    return existingUser;
  }

  async #getTokens(payload: {
    sub: string;
    email: string;
  }): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      expiresIn: '10h',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string): Promise<AuthSignInResponse> {
    const payload = this.jwtService.verify(refreshToken, {
      secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
    });

    const user = await this.userService.db.findOneBy({ id: payload.sub });

    if (!user) throw new UnauthorizedException();

    return this.generateToken(user);
  }

  async emailSignUp(input: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    profileImageUrl?: string;
  }): Promise<AuthSignInResponse> {
    const existingUser = await this.userService.db.findOne({
      where: { email: input.email },
      relations: ['artist'],
    });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const { password, ...rest } = input;

    const hashedPassword = await this.cipherService.hashInput(password);
    const newUser = this.userService.db.create({
      ...rest,
      password: hashedPassword,
      lastLoginDate: new Date(),
    });

    await this.userService.db.save(newUser);

    return this.generateToken(newUser);
  }

  async emailSignIn(input: {
    email: string;
    password: string;
  }): Promise<AuthSignInResponse> {
    const { email, password } = input;

    const user = await this.userService.db.findOne({
      where: {
        email,
      },
      relations: ['artist'],
    });

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.checkPassword({
      password,
      hashedPassword: user.password,
    });

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken(user);
  }

  async #ensureArtist(user: User, profile: Profile): Promise<User> {
    if (user.artist) {
      return user;
    }
    const artist = this.artistService.db.create({
      artistName: profile.displayName,
      user: {
        id: user.id,
      },
    });

    await this.artistService.db.save(artist);

    return this.userService.db.findOneOrFail({
      where: {
        id: user.id,
      },
      relations: ['artist'],
    });
  }
}
