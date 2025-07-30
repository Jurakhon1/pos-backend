import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  Index,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { TableEntity } from './table-entity.entity';
import { User } from './user.entity';
import { OrderItem } from './order-item.entity';

export enum OrderStatusEnum {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('order')
@Index('idx_order_status', ['status'])
export class Order {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ enum: OrderStatusEnum, default: OrderStatusEnum.PENDING })
  @Column({
    type: 'enum',
    enum: OrderStatusEnum,
    default: OrderStatusEnum.PENDING,
  })
  status: OrderStatusEnum;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  tableId: number;

   @ManyToOne(() => TableEntity, table => table.orders, { onDelete: 'SET NULL' })
@JoinColumn({ name: 'tableId' }) 
table: TableEntity;


  @ApiProperty({ required: false })
  @Column({ nullable: true })
  created_by: number;

  @ManyToOne(() => User, (user) => user.orders, { onDelete: 'SET NULL' })
  createdByUser: User;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
items: OrderItem[];

}
