import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional, Min, Max } from 'class-validator';

export class UpdateReviewDto {
  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  @IsOptional()
  orderId?: number;

  @ApiProperty({ example: 5, required: false })
  @IsNumber()
  @Min(1)
  @Max(5)
  @IsOptional()
  rating?: number;

  @ApiProperty({ example: 'Great service!', required: false })
  @IsString()
  @IsOptional()
  comment?: string;
}
