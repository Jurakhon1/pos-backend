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
import { OrderItemService } from './order-item.service';
import { OrderItem } from '../entities/order-item.entity';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';

@ApiTags('order-item')
@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Get()
  @ApiOperation({ summary: 'Get all order items' })
  @ApiResponse({ status: 200, type: [OrderItem] })
  findAll() {
    return this.orderItemService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order item by id' })
  @ApiResponse({ status: 200, type: OrderItem })
  findOne(@Param('id') id: number) {
    return this.orderItemService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create order item' })
  @ApiBody({ type: CreateOrderItemDto })
  @ApiResponse({ status: 201, type: OrderItem })
  create(@Body() data: CreateOrderItemDto) {
    return this.orderItemService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update order item' })
  @ApiBody({ type: UpdateOrderItemDto })
  @ApiResponse({ status: 200, type: OrderItem })
  update(@Param('id') id: number, @Body() data: UpdateOrderItemDto) {
    return this.orderItemService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete order item' })
  @ApiResponse({ status: 204 })
  remove(@Param('id') id: number) {
    return this.orderItemService.remove(id);
  }
}
