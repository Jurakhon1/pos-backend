import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';
import { Order } from './order.entity';

export enum TableStatusEnum {
  FREE = 'free',
  OCCUPIED = 'occupied',
  RESERVED = 'reserved',
}

@Entity('table_entity')
export class TableEntity {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1 })
  @Column({ type: 'int', unique: true, nullable: true })
  table_number: number | null;

  @ApiProperty({
    enum: TableStatusEnum,
    default: TableStatusEnum.FREE,
    example: 'occupied',
  })
  @Column({
    type: 'enum',
    enum: TableStatusEnum,
    default: TableStatusEnum.FREE,
  })
  status: TableStatusEnum;

  @ApiProperty({ example: 'John Smith', required: false })
  @Column({ nullable: true })
  waiter_name?: string;

  @ApiProperty({ example: 4, required: false })
  @Column({ nullable: true })
  guest_count?: number;

  @ApiProperty({ example: '1h 6m', required: false })
  @Column({ nullable: true })
  duration?: string;

  @ApiProperty({ example: null, required: false })
  @Column({ type: 'numeric', nullable: true })
  total?: number | null;

  @ApiProperty({
    required: false,
    type: String,
    example: '2025-07-20T12:00:00.000Z',
  })
  @Column({  nullable: true })
  reservation_time?: string;

  @ApiProperty({ required: false, type: String, example: '01:00:00' })
  @Column({ type: 'interval', nullable: true })
  reservation_duration?: any;

  @ApiProperty({ required: false, type: Number, example: 2 })
  @Column({ nullable: true })
  reserved_by: number;

  @OneToMany(() => Order, (order) => order.table)
  orders: Order[];
  @ManyToOne(() => User, (user) => user.reservedTables, {
    onDelete: 'SET NULL',
  })
  reservedByUser: User;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
