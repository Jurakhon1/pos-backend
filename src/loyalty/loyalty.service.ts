import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loyalty } from '../entities/loyalty.entity';

@Injectable()
export class LoyaltyService {
  constructor(
    @InjectRepository(Loyalty)
    private readonly loyaltyRepository: Repository<Loyalty>,
  ) {}

  async findAll(): Promise<Loyalty[]> {
    return this.loyaltyRepository.find();
  }

  async findOne(id: number): Promise<Loyalty> {
    const loyalty = await this.loyaltyRepository.findOne({ where: { id } });
    if (!loyalty) throw new NotFoundException('Loyalty record not found');
    return loyalty;
  }

  async create(data: Partial<Loyalty>): Promise<Loyalty> {
    const loyalty = this.loyaltyRepository.create(data);
    return this.loyaltyRepository.save(loyalty);
  }

  async update(id: number, data: Partial<Loyalty>): Promise<Loyalty> {
    const loyalty = await this.findOne(id);
    Object.assign(loyalty, data);
    return this.loyaltyRepository.save(loyalty);
  }

  async remove(id: number): Promise<void> {
    const loyalty = await this.findOne(id);
    await this.loyaltyRepository.remove(loyalty);
  }
}
