import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuCategory } from '../entities/menu-category.entity';
import { MenuCategoryService } from './menu-category.service';
import { MenuCategoryController } from './menu-category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MenuCategory])],
  providers: [MenuCategoryService],
  controllers: [MenuCategoryController],
  exports: [MenuCategoryService],
})
export class MenuCategoryModule {}
