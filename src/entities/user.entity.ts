import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from './order.entity';
import { TableEntity } from './table-entity.entity';
import { Loyalty } from './loyalty.entity';

export enum UserRoleEnum {
  ADMIN = 'admin',
  MANAGER = 'manager',
  WAITER = 'waiter',
  CASHIER = 'cashier',
  COOK = 'cook',
  CUSTOMER = 'customer',
}

@Entity('user')
@Index('idx_user_email', ['email'])
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty({ writeOnly: true })
  @Column()
  password: string;

  @ApiProperty({ enum: UserRoleEnum, default: UserRoleEnum.WAITER })
  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.WAITER,
  })
  role: UserRoleEnum;

  @ApiProperty()
  @Column({ default: true })
  is_active: boolean;

  @ApiProperty()
  @CreateDateColumn({ name: 'createdat', type: 'timestamptz' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updatedat', type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(() => Order, (order) => order.created_by)
  orders: Order[];

  @OneToMany(() => TableEntity, (table) => table.reserved_by)
  reservedTables: TableEntity[];

  @OneToMany(() => Loyalty, (loyalty) => loyalty.user)
  loyalty: Loyalty[];
}
