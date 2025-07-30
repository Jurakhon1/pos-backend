import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItem } from '../entities/menu-item.entity';

@Injectable()
export class MenuItemService {
  constructor(
    @InjectRepository(MenuItem)
    private readonly menuItemRepository: Repository<MenuItem>,
  ) {}

  async findAll(): Promise<MenuItem[]> {
    return this.menuItemRepository.find();
  }

  async findOne(id: number): Promise<MenuItem> {
    const item = await this.menuItemRepository.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Menu item not found');
    return item;
  }

  async create(data: Partial<MenuItem>): Promise<MenuItem> {
    const item = this.menuItemRepository.create(data);
    return this.menuItemRepository.save(item);
  }

  async update(id: number, data: Partial<MenuItem>): Promise<MenuItem> {
    const item = await this.findOne(id);
    Object.assign(item, data);
    return this.menuItemRepository.save(item);
  }

  async remove(id: number): Promise<void> {
    const item = await this.findOne(id);
    await this.menuItemRepository.remove(item);
  }
}
