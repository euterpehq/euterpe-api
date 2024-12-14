import { Module } from '@nestjs/common';
import { AudioService } from './audio.service';
import { AudioController } from './audio.controller';
import { AudioGroupController } from '@/audio/controllers/audio-group.controller';
import { AudioGroupService } from '@/audio/services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AudioGroup } from '@/audio/entities';

@Module({
  imports: [TypeOrmModule.forFeature([AudioGroup])],
  controllers: [AudioController, AudioGroupController],
  providers: [AudioService, AudioGroupService],
})
export class AudioModule {}
