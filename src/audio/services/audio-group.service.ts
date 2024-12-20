import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, IsNull } from 'typeorm';
import { BaseService } from '@/common/service/base.service';
import { UpdateAudioGroupDto } from '@/audio/dto/update-audio-group.dto';
import { CreateAudioGroupDto } from '@/audio/dto/create-audio-group.dto';
import { AudioGroup } from '@/audio/entities';

type UpdateGroupDto = {
  id: string;
} & UpdateAudioGroupDto;

@Injectable()
export class AudioGroupService extends BaseService {
  constructor(
    @InjectRepository(AudioGroup)
    private repo: Repository<AudioGroup>,
  ) {
    super();
  }

  public db = this.repo;

  async createGroup(input: CreateAudioGroupDto) {
    const group = this.repo.create(input);

    return this.repo.save(group);
  }

  async updateGroup(input: UpdateGroupDto): Promise<AudioGroup> {
    const { id, ...rest } = input;

    const group = await this.repo.findOne({
      where: { id, deletedAt: IsNull() },
    });

    if (!group) {
      throw new NotFoundException('Audio group not found');
    }

    Object.assign(group, rest);

    return await this.repo.save(group);
  }

  async getAllGroups(artistId: string): Promise<AudioGroup[]> {
    return this.repo.find({
      where: {
        artist: {
          id: artistId,
        },
        deletedAt: IsNull(),
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async getArtistGroupById(input: {
    groupId: string;
    artistId?: string;
  }): Promise<AudioGroup> {
    const group = await this.repo.findOne({
      where: {
        id: input.groupId,
        ...(input.artistId && { artist: { id: input.artistId } }),
        deletedAt: IsNull(),
      },
    });

    if (!group) {
      throw new NotFoundException();
    }

    return group;
  }
}
