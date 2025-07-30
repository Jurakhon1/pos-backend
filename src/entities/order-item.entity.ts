import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { MenuItem } from './menu-item.entity';
import { Order } from './order.entity';
import { OrderModifier } from './order-modifier.entity';

@Entity('order_item')
export class OrderItem {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  menuItemId: number;

@ManyToOne(() => MenuItem, { onDelete: 'SET NULL' })
@JoinColumn({ name: 'menuItemId' })
menuItem: MenuItem;


  @ApiProperty()
  @Column()
  orderId: number;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  order: Order;

  @ApiProperty()
  @Column()
  quantity: number;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(() => OrderModifier, (modifier) => modifier.orderItem, { cascade: true })
modifiers: OrderModifier[];

}
