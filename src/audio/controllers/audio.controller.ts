import { UpdateAudioDto } from '@/audio/dto/update-audio.dto';
import { AudioService } from '@/audio/services/audio.service';
import { AuthRequest } from '@/common/types';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UnauthorizedException,
} from '@nestjs/common';

@Controller('audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Get()
  findManyArtistSong(@Req() req: AuthRequest) {
    if (!req.user.artist) {
      throw new UnauthorizedException();
    }
    return this.audioService.findManyArtistSongs(req.user.artist.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: AuthRequest) {
    if (!req.user.artist) {
      throw new UnauthorizedException();
    }

    return this.audioService.findArtistSongById({
      artistId: req.user.artist.id,
      songId: id,
    });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAudioDto: UpdateAudioDto,
    @Req() req: AuthRequest,
  ) {
    if (!req.user.artist) {
      throw new UnauthorizedException();
    }

    return this.audioService.update({
      id,
      artistId: req.user.artist.id,
      ...updateAudioDto,
    });
  }
}
