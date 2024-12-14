import { IsNumber, IsString } from 'class-validator';

export class CreateSignDto {
  @IsString()
  songId: string;
  @IsNumber()
  songDuration: number;
  @IsNumber()
  listenedDuration: number;
}
