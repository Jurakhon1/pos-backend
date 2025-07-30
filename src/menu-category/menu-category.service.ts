import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuCategory } from '../entities/menu-category.entity';

@Injectable()
export class MenuCategoryService {
  constructor(
    @InjectRepository(MenuCategory)
    private readonly menuCategoryRepository: Repository<MenuCategory>,
  ) {}

  async findAll(): Promise<MenuCategory[]> {
    return this.menuCategoryRepository.find();
  }

  async findOne(id: number): Promise<MenuCategory> {
    const category = await this.menuCategoryRepository.findOne({
      where: { id },
    });
    if (!category) throw new NotFoundException('Menu category not found');
    return category;
  }

  async create(data: Partial<MenuCategory>): Promise<MenuCategory> {
    if (
      await this.menuCategoryRepository.findOne({ where: { name: data.name } })
    ) {
      throw new BadRequestException('Category name already exists');
    }
    const category = this.menuCategoryRepository.create(data);
    return this.menuCategoryRepository.save(category);
  }

  async update(id: number, data: Partial<MenuCategory>): Promise<MenuCategory> {
    const category = await this.findOne(id);
    Object.assign(category, data);
    return this.menuCategoryRepository.save(category);
  }

  async remove(id: number): Promise<void> {
    const category = await this.findOne(id);
    await this.menuCategoryRepository.remove(category);
  }
}
