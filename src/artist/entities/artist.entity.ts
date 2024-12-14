import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '@/auth/entities';
import { Exclude } from 'class-transformer';

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
}
