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
import { AudioService } from '@/audio/services/audio.service';
import { CreateAudioDto } from '@/audio/dto/create-audio.dto';
import { UpdateAudioDto } from '@/audio/dto/update-audio.dto';
import { AuthRequest } from '@/common/types';

@Controller('audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Post()
  create(@Body() createAudioDto: CreateAudioDto) {
    return this.audioService.create(createAudioDto);
  }

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
