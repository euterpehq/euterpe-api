import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Artist } from '@/artist/entities';
import { UpdateAudioGroupDto } from '@/audio/dto/update-audio-group.dto';
import { AudioGroup, GroupType } from '@/audio/entities';
import { BaseService } from '@/common/service/base.service';
import { IsNull, Repository } from 'typeorm';

type UpdateGroupDto = {
  id: string;
} & UpdateAudioGroupDto;

type CreateAudioGroup = {
  title: string;
  type: GroupType;
  coverImageUrl?: string;
  releaseDate?: Date | undefined;
  genre: string[];
  subGenres: string[];
  artist: Artist | undefined;
};

@Injectable()
export class AudioGroupService extends BaseService {
  constructor(
    @InjectRepository(AudioGroup)
    private repo: Repository<AudioGroup>,
  ) {
    super();
  }

  public db = this.repo;

  async createGroup(input: CreateAudioGroup) {
    return this.repo.save(input);
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
