import { IsEmail, IsString, IsUrl } from 'class-validator';

class AuthUser {
  @IsString()
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  bio: string;

  @IsString()
  pofileBannerimage: string;

  @IsUrl()
  profileImageUrl?: string;

  @IsString()
  lastLoginDate: Date;
}

export class AuthSignInResponse {
  user: AuthUser;

  accessToken: string;
  refreshToken: string;
}
