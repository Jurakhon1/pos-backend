import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { MenuCategory } from './menu-category.entity';

@Entity('menu_item')
@Index('idx_menu_item_name', ['name'])
@Index('idx_menu_item_categoryId', ['categoryId'])
export class MenuItem {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column('numeric', { precision: 10, scale: 2 })
  price: number;

  @ApiProperty({ required: false })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  categoryId: number;

  @ManyToOne(() => MenuCategory, (category) => category.items, {
    onDelete: 'SET NULL',
  })
  category: MenuCategory;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  image_url?: string;

  @ApiProperty({ required: false })
  @Column({ type: 'text', nullable: true })
  ingredients?: string;

  @ApiProperty({ required: false })
  @Column({ type: 'text', nullable: true })
  allergens?: string;

  @ApiProperty()
  @Column({ default: true })
  is_available: boolean;

  @ApiProperty()
  @Column('numeric', { precision: 5, scale: 2, default: 0 })
  discount_percentage: number;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
