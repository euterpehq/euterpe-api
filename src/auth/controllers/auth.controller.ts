import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '@/auth/services/auth.service';
import { Public } from '@/auth/decorators/public.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AuthSignInResponse } from '@/auth/dtos/auth-response.dto';
import { UserService } from '@/auth/services';
import { EmailSignInDto, EmailSignupDto } from '@/auth/dtos/email-auth.dto';
import { AuthRequest } from '@/common/types';
import { RefreshTokenDto } from '@/auth/dtos/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @Get('spotify')
  @UseGuards(AuthGuard('spotify'))
  async spotifyLogin() {}

  @Public()
  @Get('callback/spotify')
  @UseGuards(AuthGuard('spotify'))
  async spotifyCallback(@Req() req: any): Promise<AuthSignInResponse> {
    const user = req.user;

    return await this.authService.generateToken(user);
  }

  @Public()
  @Post('/email/sign-up')
  async emailSignup(
    @Body() input: EmailSignupDto,
  ): Promise<AuthSignInResponse> {
    return this.authService.emailSignUp(input);
  }

  @Public()
  @Post('/email/sign-in')
  async emailSignIn(
    @Body() input: EmailSignInDto,
  ): Promise<AuthSignInResponse> {
    return this.authService.emailSignIn(input);
  }

  @Public()
  @Post('/refresh-token')
  async refreshToken(
    @Body() input: RefreshTokenDto,
  ): Promise<AuthSignInResponse> {
    return this.authService.refreshToken(input.refreshToken);
  }

  @Get('/me')
  async profile(@Req() req: AuthRequest) {
    return req.user;
  }
}
