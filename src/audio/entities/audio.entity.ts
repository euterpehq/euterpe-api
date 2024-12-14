import { User } from '@/auth/entities';
import {
  DeleteDateColumn,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('audios')
export class Audio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  spotifyId: string;

  @Column()
  title: string;

  @Column()
  artist: string;

  @Column('simple-array')
  featuredArtists: string[];

  @Column()
  album: string;

  @Column({ nullable: true })
  albumCoverUrl: string;

  @Column({ nullable: true })
  releaseDate: string;

  @Column({ type: 'float', default: 0 })
  durationInSeconds: number;

  @Column({ type: 'float', default: 0 })
  popularity: number;

  @Column({ type: 'float', default: 0 })
  explicit: boolean;

  @Column({ type: 'simple-array', nullable: true })
  genres: string[];

  @Column({ type: 'int' })
  songLength: number;

  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Audio, (audio) => audio.user)
  user: User;
}
