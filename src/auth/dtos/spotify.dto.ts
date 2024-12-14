import { IsString } from 'class-validator';

export class ExchangeSpotifyTokenDto {
  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}
