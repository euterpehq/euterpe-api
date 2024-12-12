class AuthUser {
  id: string;

  email: string;

  profileImageUrl?: string;

  lastLoginDate: Date;
}

export class AuthSignInResponse {
  user: AuthUser;

  accessToken: string;
  refreshToken: string;
}
