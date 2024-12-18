import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@/auth/entities';
import { Exclude } from 'class-transformer';
import { AudioGroup, Audio } from '@/audio/entities';

@Entity('artists')
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  artistName?: string;

  @Column({ nullable: true })
  profileBannerUrl?: string;

  @Column({ nullable: true })
  spotifyId?: string;

  @Column({ nullable: true, type: 'text' })
  bio?: string;

  @Exclude()
  @OneToOne(() => User, (user) => user.artist)
  user: User;

  @Exclude()
  @OneToMany(() => AudioGroup, (g) => g.artist, { cascade: false })
  audioGroups: AudioGroup[];

  @Exclude()
  @OneToMany(() => Audio, (a) => a.artist, { cascade: false })
  audios: Audio[];
}
