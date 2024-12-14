import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '@/auth/services/auth.service';
import { Public } from '@/auth/decorators/public.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AuthSignInResponse } from '@/auth/dtos/auth-response.dto';
import { EmailSignInDto, EmailSignupDto } from '@/auth/dtos/email-auth.dto';
import { AuthRequest } from '@/common/types';
import { RefreshTokenDto } from '@/auth/dtos/refresh-token.dto';
import { PublicUserDto } from '@/auth/dtos/user.dto';
import { ExchangeSpotifyTokenDto } from '@/auth/dtos/spotify.dto';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @Get('spotify')
  @UseGuards(AuthGuard('spotify'))
  async spotifyLogin() {}

  @Public()
  @Get('callback/spotify')
  @UseGuards(AuthGuard('spotify'))
  async spotifyCallback(@Req() req: any, @Res() res: Response) {
    const user = req.user;

    const token = await this.authService.generateToken(user);

    const redirectUrl =
      this.configService.get<string>('ARTIST_APP_BASE_URL') || '';

    const accessToken = encodeURIComponent(token.accessToken);
    const refreshToken = encodeURIComponent(token.refreshToken);

    return res.redirect(
      `${redirectUrl}?accessToken=${accessToken}&refreshToken=${refreshToken}`,
    );
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
  async profile(@Req() req: AuthRequest): Promise<PublicUserDto> {
    return req.user;
  }
}
