import { Artist } from '@/artist/entities/artist.entity';
import { AudioGroup } from '@/audio/entities/audio-group.entity';
import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum fileType {
  WAV = 'WAV',
  MP3 = 'MP3',
  FLAC = 'FLAC',
  AIFF = 'AIFF',
  WMA = 'WMA',
}
@Entity('audios')
export class Audio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ unique: true, type: 'enum', enum: fileType })
  fileType: fileType;

  @Column({ default: 1 })
  trackNumber: number;

  @Column({ nullable: true })
  coverImageUrl: string;

  @Column({ nullable: true })
  releaseDate: Date;

  @Column({ type: 'int', default: 0 })
  durationInSeconds: number;

  @Column('json')
  genre: string[];

  @ApiHideProperty()
  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;

  @ApiHideProperty()
  @ManyToOne(() => Artist, (a) => a.audios)
  artist: Artist | undefined;

  @ApiHideProperty()
  @ManyToMany(() => Artist, (a) => a.audios)
  featuredArtist: Artist[];

  @ApiHideProperty()
  @ManyToOne(() => AudioGroup, (g) => g.audios)
  audioGroup: AudioGroup;
}
