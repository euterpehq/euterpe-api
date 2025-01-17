import { Module } from '@nestjs/common';
import { ArtistService } from '@/artist/services/artist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from '@/artist/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Artist])],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
