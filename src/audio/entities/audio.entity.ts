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

  @Column({ unique: true })
  spotifyId: string;

  @Column()
  title: string;

  @Column({ unique: true, type: 'enum', enum: fileType })
  fileType: fileType;

  @Column('simple-array')
  featuredArtists: string[];

  @Column({ default: 1 })
  trackNumber: number;

  // @Column()
  // album: string;
  //
  // @Column({ nullable: true })
  // albumCoverUrl: string;

  @Column({ nullable: true })
  releaseDate: string;

  @Column({ type: 'int', default: 0 })
  durationInSeconds: number;

  @Column({ type: 'float', default: 0 })
  popularity: number;

  @Column({ type: 'boolean', default: false })
  explicit: boolean;

  @Column({ type: 'simple-array', nullable: true })
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
  artist: Artist;

  @ApiHideProperty()
  @ManyToMany(() => Artist, (a) => a.audios)
  featuredArtist: Artist[];

  @ApiHideProperty()
  @ManyToOne(() => AudioGroup, (g) => g.audios)
  audioGroup: AudioGroup;
}
