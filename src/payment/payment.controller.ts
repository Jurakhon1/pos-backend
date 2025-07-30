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
import { PaymentService } from './payment.service';
import { Payment } from '../entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  @ApiOperation({ summary: 'Get all payments' })
  @ApiResponse({ status: 200, type: [Payment] })
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get payment by id' })
  @ApiResponse({ status: 200, type: Payment })
  findOne(@Param('id') id: number) {
    return this.paymentService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create payment' })
  @ApiBody({ type: CreatePaymentDto })
  @ApiResponse({ status: 201, type: Payment })
  create(@Body() data: CreatePaymentDto) {
    return this.paymentService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update payment' })
  @ApiBody({ type: UpdatePaymentDto })
  @ApiResponse({ status: 200, type: Payment })
  update(@Param('id') id: number, @Body() data: UpdatePaymentDto) {
    return this.paymentService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete payment' })
  @ApiResponse({ status: 204 })
  remove(@Param('id') id: number) {
    return this.paymentService.remove(id);
  }
}
