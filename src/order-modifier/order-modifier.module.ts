import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModifier } from '../entities/order-modifier.entity';
import { OrderModifierService } from './order-modifier.service';
import { OrderModifierController } from './order-modifier.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OrderModifier])],
  providers: [OrderModifierService],
  controllers: [OrderModifierController],
  exports: [OrderModifierService],
})
export class OrderModifierModule {}
