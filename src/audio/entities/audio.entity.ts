import { User } from '@/auth/entities';
import {
  DeleteDateColumn,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Audio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  spotifyId: string; // Unique ID assigned by Spotify (e.g., "4uLU6hMCjMI75M1A2tKUQC")

  @Column()
  title: string; // Title of the song

  @Column()
  artist: string; // Primary artist of the song

  @Column('simple-array')
  featuredArtists: string[]; // List of featured artists, if any

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
  genres: string[]; // Associated genres (e.g., "pop", "rock")

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date; // When the entry was created

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Audio, (audio) => audio.user)
  user: User;
}
