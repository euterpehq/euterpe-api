import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Entity,
  Index,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Group } from './group.entity';
import { Audio } from '@/audio/entities/audio.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  artistName: string;

  @Index()
  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  profileBannerUrl: string;

  @Exclude()
  @Column({
    nullable: true,
  })
  password?: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  profileImageUrl?: string;

  @Column()
  lastLoginDate: Date;

  @Index()
  @Exclude()
  @Column({ nullable: true })
  refreshToken?: string;

  @Exclude()
  @Column({ nullable: true })
  spotifyAccessToken?: string;

  @Exclude()
  @Column({ nullable: true })
  spotifyRefreshToken?: string;

  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Group, (group) => group.user)
  groups: Group;

  @OneToMany(() => Audio, (audio) => audio.user)
  audios: Audio;
}
