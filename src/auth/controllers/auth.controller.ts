import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '@/auth/services/auth.service';
import { Public } from '@/auth/decorators/public.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AuthSignInResponse } from '@/auth/dtos/auth-response.dto';
import { UserService } from '@/auth/services';
import logger from '@/common/utils/logger';

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
  @Get('test')
  async getUsers() {
    return this.userService.db.findBy({});
  }
}
