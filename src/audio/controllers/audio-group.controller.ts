import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AudioGroupService, AudioService } from '@/audio/services';
import { AuthRequest } from '@/common/types';
import { UpdateAudioGroupDto } from '@/audio/dto/update-audio-group.dto';
import { AudioGroup } from '@/audio/entities';
import { CreateAudioGroupDto } from '../dto/create-audio-group.dto';

@Controller('audio-groups')
export class AudioGroupController {
  constructor(
    private audioGroupService: AudioGroupService,
    private audioService: AudioService,
  ) {}

  @Get('')
  async getAll(@Req() req: AuthRequest): Promise<AudioGroup[]> {
    if (!req.user.artist) {
      throw new UnauthorizedException();
    }
    return this.audioGroupService.getAllGroups(req.user.artist.id);
  }

  @Post()
  async Create(@Req() req: AuthRequest, @Body() input: CreateAudioGroupDto) {
    const { audios, ...rest } = input;
    const artist = req.user.artist;

    const audioGroup = await this.audioGroupService.createGroup({
      artist,
      ...rest,
    });

    await this.audioService.create({
      audios,
      artist,
      audioGroup,
    });
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Req() req: AuthRequest,
  ): Promise<AudioGroup> {
    return this.audioGroupService.getArtistGroupById({
      artistId: req.user.artist?.id,
      groupId: id,
    });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAudioDto: UpdateAudioGroupDto,
  ): Promise<AudioGroup> {
    return this.audioGroupService.updateGroup({
      id,
      ...updateAudioDto,
    });
  }
}
