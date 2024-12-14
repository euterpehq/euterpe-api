import { BaseService } from '@/common/service/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/auth/entities';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService extends BaseService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {
    super();
  }

  public db = this.repo;
}
