import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateMenuCategoryDto {
  @ApiProperty({ example: 'Coffee', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'Hot and cold coffee drinks', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'https://example.com/image.jpg', required: false })
  @IsString()
  @IsOptional()
  image_url?: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
