import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsDateString, IsNumber } from 'class-validator';
import { TableStatusEnum } from '../../entities/table-entity.entity';

export class CreateTableDto {
  @ApiProperty({ enum: TableStatusEnum, default: TableStatusEnum.FREE })
  @IsEnum(TableStatusEnum)
  status: TableStatusEnum;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  reservation_time?: string;

  @ApiProperty({ required: false, example: '01:00:00' })
  @IsOptional()
  reservation_duration?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  reserved_by?: number;
}
