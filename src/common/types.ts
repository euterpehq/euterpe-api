import { User } from '@/auth/entities/user.entity';
import { Request } from 'express';

export type AuthRequest = Request & { user: User };
