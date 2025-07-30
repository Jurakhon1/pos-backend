import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateLoyaltyDto {
  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  @IsOptional()
  userId?: number;

  @ApiProperty({ example: 100, required: false })
  @IsNumber()
  @IsOptional()
  points?: number;
}
