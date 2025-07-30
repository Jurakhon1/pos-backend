import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from './order.entity';

@Entity('review')
export class Review {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ nullable: true })
  orderId: number;

  @ManyToOne(() => Order, { onDelete: 'SET NULL' })
  order: Order;

  @ApiProperty({ minimum: 1, maximum: 5 })
  @Column()
  rating: number;

  @ApiProperty({ required: false })
  @Column({ type: 'text', nullable: true })
  comment?: string;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
