import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Artist } from '@/artist/entities/artist.entity';
import { ApiHideProperty } from '@nestjs/swagger';

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
    unique: true,
    type: 'enum',
    enum: GroupType,
    default: GroupType.Single,
  })
  type: GroupType;

  @Column({ nullable: true })
  coverImageUrl?: string;

  @Column({ nullable: true })
  releaseDate: Date;

  @Column({ default: false })
  isListed: boolean;

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

  constructor(partial: Partial<AudioGroup>) {
    Object.assign(this, partial);
  }
}
