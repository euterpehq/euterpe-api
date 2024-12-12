import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Index,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ unique: true })
  email: string;

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
}
