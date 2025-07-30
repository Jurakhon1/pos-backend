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
import { MenuItemService } from './menu-item.service';
import { MenuItem } from '../entities/menu-item.entity';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';

@ApiTags('menu-item')
@Controller('menu-item')
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}

  @Get()
  @ApiOperation({ summary: 'Get all menu items' })
  @ApiResponse({ status: 200, type: [MenuItem] })
  findAll() {
    return this.menuItemService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get menu item by id' })
  @ApiResponse({ status: 200, type: MenuItem })
  findOne(@Param('id') id: number) {
    return this.menuItemService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create menu item' })
  @ApiBody({ type: CreateMenuItemDto })
  @ApiResponse({ status: 201, type: MenuItem })
  create(@Body() data: CreateMenuItemDto) {
    return this.menuItemService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update menu item' })
  @ApiBody({ type: UpdateMenuItemDto })
  @ApiResponse({ status: 200, type: MenuItem })
  update(@Param('id') id: number, @Body() data: UpdateMenuItemDto) {
    return this.menuItemService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete menu item' })
  @ApiResponse({ status: 204 })
  remove(@Param('id') id: number) {
    return this.menuItemService.remove(id);
  }
}
