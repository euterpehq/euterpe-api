import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/auth/entities/user.entity';
import { UserService } from '@/auth/services/user.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@/auth/guards';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '@/auth/services/auth.service';
import { AuthController } from '@/auth/controllers/auth.controller';
import { SpotifyStrategy } from '@/auth/strategies/spotify.strategy';
import { ArtistModule } from '@/artist/artist.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
    }),
    PassportModule,
    ArtistModule,
  ],
  providers: [
    UserService,
    JwtService,
    AuthService,
    SpotifyStrategy,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
