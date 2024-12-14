import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AudioGroupService } from '@/audio/services';
import { AuthRequest } from '@/common/types';
import { UpdateAudioGroupDto } from '@/audio/dto/update-audio-group.dto';
import { AudioGroup } from '@/audio/entities';

@Controller('audio-groups')
export class AudioGroupController {
  constructor(private audioGroupService: AudioGroupService) {}

  @Get('')
  async getAll(@Req() req: AuthRequest): Promise<AudioGroup[]> {
    if (!req.user.artist) {
      throw new UnauthorizedException();
    }
    return this.audioGroupService.getAllGroups(req.user.artist.id);
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
