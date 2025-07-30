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
import { OrderModifierService } from './order-modifier.service';
import { OrderModifier } from '../entities/order-modifier.entity';
import { CreateOrderModifierDto } from './dto/create-order-modifier.dto';
import { UpdateOrderModifierDto } from './dto/update-order-modifier.dto';

@ApiTags('order-modifier')
@Controller('order-modifier')
export class OrderModifierController {
  constructor(private readonly orderModifierService: OrderModifierService) {}

  @Get()
  @ApiOperation({ summary: 'Get all order modifiers' })
  @ApiResponse({ status: 200, type: [OrderModifier] })
  findAll() {
    return this.orderModifierService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order modifier by id' })
  @ApiResponse({ status: 200, type: OrderModifier })
  findOne(@Param('id') id: number) {
    return this.orderModifierService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create order modifier' })
  @ApiBody({ type: CreateOrderModifierDto })
  @ApiResponse({ status: 201, type: OrderModifier })
  create(@Body() data: CreateOrderModifierDto) {
    return this.orderModifierService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update order modifier' })
  @ApiBody({ type: UpdateOrderModifierDto })
  @ApiResponse({ status: 200, type: OrderModifier })
  update(@Param('id') id: number, @Body() data: UpdateOrderModifierDto) {
    return this.orderModifierService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete order modifier' })
  @ApiResponse({ status: 204 })
  remove(@Param('id') id: number) {
    return this.orderModifierService.remove(id);
  }
}
