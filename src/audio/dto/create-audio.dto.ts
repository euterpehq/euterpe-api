import { fileType } from '@/audio/entities';
import { IsArray, IsDate, IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateAudioDto {
  @IsString()
  title: string;

  @IsEnum(fileType)
  fileType: fileType;

  @IsNumber()
  trackNumber: number;

  @IsNumber()
  durationInSeconds: number;

  @IsDate()
  releaseDate?: Date;

  @IsArray()
  @IsString({ each: true })
  genre: string[];

  @IsArray()
  @IsString({ each: true })
  featuredArtists: Array<string>;
}
