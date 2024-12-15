import { Injectable } from '@nestjs/common';
import { BaseService } from '@/common/service/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from '@/artist/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService extends BaseService {
  constructor(
    @InjectRepository(Artist)
    private readonly repo: Repository<Artist>,
  ) {
    super();
  }

  public db = this.repo;
}
