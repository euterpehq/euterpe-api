import { Module } from '@nestjs/common';
import { AudioService } from './services';
import { AudioController } from './controllers';
import { AudioGroupController } from '@/audio/controllers/audio-group.controller';
import { AudioGroupService } from '@/audio/services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Audio, AudioGroup } from '@/audio/entities';

@Module({
  imports: [TypeOrmModule.forFeature([AudioGroup, Audio])],
  controllers: [AudioController, AudioGroupController],
  providers: [AudioService, AudioGroupService],
})
export class AudioModule {}
