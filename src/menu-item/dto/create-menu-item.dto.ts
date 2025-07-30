import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateMenuItemDto {
  @ApiProperty({ example: 'Espresso' })
  @IsString()
  name: string;

  @ApiProperty({ example: 2.5 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 'Strong coffee shot', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  @IsOptional()
  categoryId?: number;

  @ApiProperty({ example: 'https://example.com/image.jpg', required: false })
  @IsString()
  @IsOptional()
  image_url?: string;

  @ApiProperty({ example: 'Coffee beans, water', required: false })
  @IsString()
  @IsOptional()
  ingredients?: string;

  @ApiProperty({ example: 'None', required: false })
  @IsString()
  @IsOptional()
  allergens?: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  is_available?: boolean;

  @ApiProperty({ example: 0, required: false })
  @IsNumber()
  @IsOptional()
  discount_percentage?: number;
}
