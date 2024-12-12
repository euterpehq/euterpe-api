import { PickType } from '@nestjs/swagger';
import { User } from '@/auth/entities';

export class PublicUserDto extends PickType(User, [
  'id',
  'email',
  'firstName',
  'lastName',
  'profileImageUrl',
  'lastLoginDate',
] as const) {}
