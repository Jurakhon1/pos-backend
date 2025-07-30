import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

@Entity('loyalty')
export class Loyalty {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ nullable: true })
  userId: number;

  @ManyToOne(() => User, (user) => user.loyalty, { onDelete: 'SET NULL' })
  user: User;

  @ApiProperty()
  @Column()
  points: number;

  @ApiProperty()
  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  last_updated: Date;
}
