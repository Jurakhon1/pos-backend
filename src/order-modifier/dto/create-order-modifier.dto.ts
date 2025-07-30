import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateOrderModifierDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  orderItemId: number;

  @ApiProperty({ example: 'Extra cheese', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  @IsOptional()
  quantity?: number;
}
