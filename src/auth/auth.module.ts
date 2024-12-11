import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/auth/entities/user.entity';
import { UserService } from '@/auth/services/user.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@/auth/guards';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
    }),
  ],
  providers: [
    UserService,
    JwtService,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AuthModule {}
