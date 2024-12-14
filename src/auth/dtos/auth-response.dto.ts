import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';

class AuthArtist {
  @IsString()
  id: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  profileBannerUrl?: string;
}

class AuthUser {
  @IsString()
  id: string;

  @IsEmail()
  email: string;

  @IsUrl()
  profileImageUrl?: string;

  @IsString()
  lastLoginDate: Date;

  artist?: AuthArtist;
}

export class AuthSignInResponse {
  user: AuthUser;

  accessToken: string;
  refreshToken: string;
}
