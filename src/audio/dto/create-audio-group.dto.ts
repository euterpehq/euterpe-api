import { fileType, GroupType } from '@/audio/entities';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

class AudioArray {
  @IsString()
  title: string;

  @IsEnum(fileType)
  fileType: fileType;

  @IsArray()
  @IsString({ each: true })
  featuredArtists: Array<string>;

  @IsNumber()
  trackNumber: number;

  @IsNumber()
  durationInSeconds: number;

  @IsArray()
  @IsString({ each: true })
  genre: string[];

  @IsDate()
  releaseDate?: Date;
}

export class CreateAudioGroupDto {
  @IsString()
  title: string;

  @IsEnum(GroupType)
  type: GroupType;

  @IsString()
  coverImageUrl?: string;

  @IsDate()
  releaseDate?: Date;

  @IsBoolean()
  isListed?: boolean;

  @IsString()
  genre: string;

  @IsArray()
  subGenres: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AudioArray)
  audios: AudioArray[];
}
