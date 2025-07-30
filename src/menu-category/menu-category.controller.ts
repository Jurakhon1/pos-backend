import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { MenuCategoryService } from './menu-category.service';
import { MenuCategory } from '../entities/menu-category.entity';
import { CreateMenuCategoryDto } from './dto/create-menu-category.dto';
import { UpdateMenuCategoryDto } from './dto/update-menu-category.dto';

@ApiTags('menu-category')
@Controller('menu-category')
export class MenuCategoryController {
  constructor(private readonly menuCategoryService: MenuCategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Get all menu categories' })
  @ApiResponse({ status: 200, type: [MenuCategory] })
  findAll() {
    return this.menuCategoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get menu category by id' })
  @ApiResponse({ status: 200, type: MenuCategory })
  findOne(@Param('id') id: number) {
    return this.menuCategoryService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create menu category' })
  @ApiBody({ type: CreateMenuCategoryDto })
  @ApiResponse({ status: 201, type: MenuCategory })
  create(@Body() data: CreateMenuCategoryDto) {
    return this.menuCategoryService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update menu category' })
  @ApiBody({ type: UpdateMenuCategoryDto })
  @ApiResponse({ status: 200, type: MenuCategory })
  update(@Param('id') id: number, @Body() data: UpdateMenuCategoryDto) {
    return this.menuCategoryService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete menu category' })
  @ApiResponse({ status: 204 })
  remove(@Param('id') id: number) {
    return this.menuCategoryService.remove(id);
  }
}
