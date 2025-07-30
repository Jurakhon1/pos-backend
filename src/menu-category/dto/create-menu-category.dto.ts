import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateMenuCategoryDto {
  @ApiProperty({ example: 'Coffee' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Hot and cold coffee drinks', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'https://example.com/image.jpg', required: false })
  @IsString()
  @IsOptional()
  image_url?: string;
}
