import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsNumber } from 'class-validator';
import { OrderStatusEnum } from '../../entities/order.entity';

export class UpdateOrderDto {
  @ApiProperty({ enum: OrderStatusEnum, example: 'completed', required: false })
  @IsEnum(OrderStatusEnum)
  @IsOptional()
  status?: OrderStatusEnum;

  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  @IsOptional()
  tableId?: number;

  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  @IsOptional()
  created_by?: number;
}
