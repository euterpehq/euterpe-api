import { OmitType } from '@nestjs/swagger';
import { AudioGroup } from '@/audio/entities';

export class CreateAudioGroupDto extends OmitType(AudioGroup, [
  'id',
  'createdAt',
  'updatedAt',
  'deletedAt',
] as const) {}
