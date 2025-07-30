import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from '../entities/order-item.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async findAll(): Promise<OrderItem[]> {
    return this.orderItemRepository.find();
  }

  async findOne(id: number): Promise<OrderItem> {
    const item = await this.orderItemRepository.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Order item not found');
    return item;
  }

  async create(data: Partial<OrderItem>): Promise<OrderItem> {
    if (data.quantity && data.quantity <= 0) {
      throw new BadRequestException('Quantity must be greater than 0');
    }
    const item = this.orderItemRepository.create(data);
    return this.orderItemRepository.save(item);
  }

  async update(id: number, data: Partial<OrderItem>): Promise<OrderItem> {
    if (data.quantity && data.quantity <= 0) {
      throw new BadRequestException('Quantity must be greater than 0');
    }
    const item = await this.findOne(id);
    Object.assign(item, data);
    return this.orderItemRepository.save(item);
  }

  async remove(id: number): Promise<void> {
    const item = await this.findOne(id);
    await this.orderItemRepository.remove(item);
  }
}
