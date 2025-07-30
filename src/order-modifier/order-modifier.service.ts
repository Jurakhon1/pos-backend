import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderModifier } from '../entities/order-modifier.entity';

@Injectable()
export class OrderModifierService {
  constructor(
    @InjectRepository(OrderModifier)
    private readonly orderModifierRepository: Repository<OrderModifier>,
  ) {}

  async findAll(): Promise<OrderModifier[]> {
    return this.orderModifierRepository.find();
  }

  async findOne(id: number): Promise<OrderModifier> {
    const modifier = await this.orderModifierRepository.findOne({
      where: { id },
    });
    if (!modifier) throw new NotFoundException('Order modifier not found');
    return modifier;
  }

  async create(data: Partial<OrderModifier>): Promise<OrderModifier> {
    if (data.quantity && data.quantity <= 0) {
      throw new BadRequestException('Quantity must be greater than 0');
    }
    const modifier = this.orderModifierRepository.create(data);
    return this.orderModifierRepository.save(modifier);
  }

  async update(
    id: number,
    data: Partial<OrderModifier>,
  ): Promise<OrderModifier> {
    if (data.quantity && data.quantity <= 0) {
      throw new BadRequestException('Quantity must be greater than 0');
    }
    const modifier = await this.findOne(id);
    Object.assign(modifier, data);
    return this.orderModifierRepository.save(modifier);
  }

  async remove(id: number): Promise<void> {
    const modifier = await this.findOne(id);
    await this.orderModifierRepository.remove(modifier);
  }
}
