import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsEnum, IsOptional } from 'class-validator';
import {
  PaymentMethodEnum,
  PaymentStatusEnum,
} from '../../entities/payment.entity';

export class UpdatePaymentDto {
  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  @IsOptional()
  orderId?: number;

  @ApiProperty({ example: 10.5, required: false })
  @IsNumber()
  @IsOptional()
  amount?: number;

  @ApiProperty({ enum: PaymentMethodEnum, example: 'cash', required: false })
  @IsEnum(PaymentMethodEnum)
  @IsOptional()
  payment_method?: PaymentMethodEnum;

  @ApiProperty({
    enum: PaymentStatusEnum,
    example: 'completed',
    required: false,
  })
  @IsEnum(PaymentStatusEnum)
  @IsOptional()
  status?: PaymentStatusEnum;
}
