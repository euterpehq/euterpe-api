import { UserService } from '@/auth/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/auth/entities';
import { AuthSignInResponse } from '@/auth/dtos/auth-response.dto';
import { Injectable } from '@nestjs/common';
import { Profile } from 'passport-spotify';
import { BaseService } from '@/common/service/base.service';
import { CipherService } from '@/lib/services/crypto.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService extends BaseService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly cipherService: CipherService,
    private readonly configService: ConfigService,
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

    return {
      user: {
        id: user.id,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        lastLoginDate: user.lastLoginDate,
      },
      ...(await this.#getTokens(payload)),
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

    return this.userService.db.findOneByOrFail({
      email: user.email,
    });
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
}
