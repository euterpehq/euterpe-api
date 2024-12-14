import { PartialType } from '@nestjs/swagger';
import { CreateAudioGroupDto } from '@/audio/dto/create-audio-group.dto';

export class UpdateAudioGroupDto extends PartialType(CreateAudioGroupDto) {}
