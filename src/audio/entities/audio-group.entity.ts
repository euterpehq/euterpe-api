import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Artist } from '@/artist/entities/artist.entity';
import { ApiHideProperty } from '@nestjs/swagger';
import { Audio } from '@/audio/entities/audio.entity';

export enum GroupType {
  Single = 'single',
  EP = 'ep',
  Album = 'album',
}
@Entity('audio_groups')
export class AudioGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: GroupType,
    default: GroupType.Single,
  })
  type: GroupType;

  @Column()
  title: string;

  @Column({ nullable: true })
  coverImageUrl?: string;

  @Column({ nullable: true })
  releaseDate: Date;

  @Column({ default: false })
  isListed: boolean;

  @Column('json')
  genre: string[];

  @Column('json')
  subGenres: string[];

  @ApiHideProperty()
  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @ApiHideProperty()
  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiHideProperty()
  @Exclude()
  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  @ApiHideProperty()
  @Exclude()
  @ManyToOne(() => Artist, (artist) => artist.audioGroups)
  @JoinTable()
  artist: Artist;

  @OneToMany(() => Audio, (a) => a.audioGroup, { cascade: false })
  @JoinColumn()
  audios: Audio;

  constructor(partial: Partial<AudioGroup>) {
    Object.assign(this, partial);
  }
}
