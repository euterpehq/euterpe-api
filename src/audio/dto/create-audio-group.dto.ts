import { fileType, GroupType } from '@/audio/entities';
import { OmitType } from '@nestjs/swagger';
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

export class AudioDto {
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

export class CreateAudioGroupDto {
  @IsString()
  title: string;

  @IsEnum(GroupType)
  type: GroupType;

  @IsString()
  coverImageUrl?: string;

  @IsDate()
  releaseDate?: Date;

  @IsBoolean({})
  isListed?: boolean;

  @IsString()
  genre: string[];

  @IsArray()
  subGenres: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AudioDto)
  audios: AudioDto[];
}

export class CreateAudioServiceDto extends OmitType(CreateAudioGroupDto, [
  'audios',
]) {}
