import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateOrderItemDto {
  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  @IsOptional()
  menuItemId?: number;

  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  @IsOptional()
  orderId?: number;

  @ApiProperty({ example: 2, required: false })
  @IsNumber()
  @IsOptional()
  quantity?: number;
}
