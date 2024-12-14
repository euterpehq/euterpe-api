import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@/auth/entities';
import { Exclude } from 'class-transformer';
import { SongGroup } from '@/audio/entities/song-group.entity';

@Entity('artists')
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  artistName?: string;

  @Column({ nullable: true })
  profileBannerUrl?: string;

  @Column({ nullable: true, type: 'text' })
  bio?: string;

  @Exclude()
  @OneToOne(() => User, (user) => user.artist)
  user: User;

  @Exclude()
  @OneToMany(() => SongGroup, (g) => g.artist, { cascade: false })
  songGroups: SongGroup[];
}
