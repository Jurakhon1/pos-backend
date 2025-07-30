import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from './order.entity';

export enum PaymentMethodEnum {
  CASH = 'cash',
  CARD = 'card',
  ONLINE = 'online',
}

export enum PaymentStatusEnum {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

@Entity('payment')
export class Payment {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ nullable: true })
  orderId: number;

  @ManyToOne(() => Order, { onDelete: 'SET NULL' })
  order: Order;

  @ApiProperty()
  @Column('numeric', { precision: 10, scale: 2 })
  amount: number;

  @ApiProperty({ enum: PaymentMethodEnum })
  @Column({
    type: 'enum',
    enum: PaymentMethodEnum,
  })
  payment_method: PaymentMethodEnum;

  @ApiProperty({ enum: PaymentStatusEnum })
  @Column({
    type: 'enum',
    enum: PaymentStatusEnum,
  })
  status: PaymentStatusEnum;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
