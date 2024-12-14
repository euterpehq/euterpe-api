import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-spotify';
import { AuthService } from '@/auth/services/auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SpotifyStrategy extends PassportStrategy(Strategy, 'spotify') {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    const hostUrl =
      configService.get<string>('API_BASE_URL') || 'http://localhost:5200';
    const spotifyUrl =
      configService.get<string>('SPOTIFY_CALLBACK_URL') ||
      'auth/callback/spotify';

    const callbackURL = `${hostUrl}/${spotifyUrl}`;

    super({
      clientID: configService.get<string>('SPOTIFY_CLIENT_ID'),
      clientSecret: configService.get<string>('SPOTIFY_CLIENT_SECRET'),
      callbackURL,
      scope: ['user-read-email', 'user-read-private'], // TODO:  might need to add more scopes
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: any,
  ): Promise<any> {
    try {
      const user = await this.authService.validateSpotifyUser({
        profile,
        accessToken,
        refreshToken,
      });

      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }
}
