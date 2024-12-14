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

export enum GroupType {
  Single,
  EP,
  Album,
}

@Entity('song_groups')
export class SongGroup {
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

  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => Artist, (artist) => artist.songGroups)
  @JoinTable()
  artist: Artist;
}
