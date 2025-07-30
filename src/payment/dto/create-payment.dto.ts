import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsEnum } from 'class-validator';
import {
  PaymentMethodEnum,
  PaymentStatusEnum,
} from '../../entities/payment.entity';

export class CreatePaymentDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  orderId: number;

  @ApiProperty({ example: 10.5 })
  @IsNumber()
  amount: number;

  @ApiProperty({ enum: PaymentMethodEnum, example: 'cash' })
  @IsEnum(PaymentMethodEnum)
  payment_method: PaymentMethodEnum;

  @ApiProperty({ enum: PaymentStatusEnum, example: 'completed' })
  @IsEnum(PaymentStatusEnum)
  status: PaymentStatusEnum;
}
