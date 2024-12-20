import { Artist } from '@/artist/entities';
import { CreateAudioDto } from '@/audio/dto/create-audio.dto';
import { UpdateAudioDto } from '@/audio/dto/update-audio.dto';
import { Audio, AudioGroup } from '@/audio/entities';
import { BaseService } from '@/common/service/base.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CreateAudioServiceDto } from '../dto/create-audio-group.dto';

type UpdateAudio = {
  id: string;
  artistId: string;
} & UpdateAudioDto;

type CreateAudio = {
  artist: Artist | undefined;
  audioGroup: AudioGroup;
} & CreateAudioDto;

@Injectable()
export class AudioService extends BaseService {
  constructor(
    @InjectRepository(Audio)
    private repo: Repository<Audio>,
  ) {
    super();
  }

  public db = this.repo;

  create(input: CreateAudio): Promise<Audio> {
    this.logger.log(input);
    const audio = this.repo.create(input);

    return this.repo.save(audio);
  }

  async findArtistSongById(input: {
    artistId: string;
    songId: string;
  }): Promise<Audio> {
    const audio = await this.repo.findOne({
      where: {
        id: input.songId,
        artist: {
          id: input.artistId,
        },
        deletedAt: IsNull(),
      },
      order: {
        createdAt: 'DESC',
      },
    });

    if (!audio) {
      throw new NotFoundException('Song not found');
    }

    return audio;
  }

  async findManyArtistSongs(artistId: string): Promise<Audio[]> {
    return this.repo.find({
      where: {
        artist: {
          id: artistId,
        },
        deletedAt: IsNull(),
      },
    });
  }

  async update(input: UpdateAudio) {
    const { id, ...rest } = input;

    const audio = await this.repo.findOne({
      where: {
        id,
        deletedAt: IsNull(),
      },
    });

    if (!audio) {
      throw new NotFoundException('Song not found');
    }

    Object.assign(audio, rest);

    return this.repo.save(audio);
  }
}
