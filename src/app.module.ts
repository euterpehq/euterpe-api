import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validateEnv as validate } from '@/common/utils/env.validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { LibModule } from './lib/lib.module';
import typeorm from '@/config/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm') as TypeOrmModule,
      inject: [ConfigService],
    }),
    AuthModule,
    LibModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
