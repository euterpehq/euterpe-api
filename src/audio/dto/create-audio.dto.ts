import { OmitType } from '@nestjs/swagger';
import { Audio } from '@/audio/entities';

export class CreateAudioDto extends OmitType(Audio, [
  'id',
  'createdAt',
  'updatedAt',
  'deletedAt',
] as const) {}
