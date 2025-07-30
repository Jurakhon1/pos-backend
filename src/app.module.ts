import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MenuCategoryModule } from './menu-category/menu-category.module';
import { MenuItemModule } from './menu-item/menu-item.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { OrderModifierModule } from './order-modifier/order-modifier.module';
import { PaymentModule } from './payment/payment.module';
import { ReviewModule } from './review/review.module';
import { LoyaltyModule } from './loyalty/loyalty.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { TableModule } from './table/table.module';
import { User } from './entities/user.entity';
import { MenuCategory } from './entities/menu-category.entity';
import { MenuItem } from './entities/menu-item.entity';
import { TableEntity } from './entities/table-entity.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { OrderModifier } from './entities/order-modifier.entity';
import { Payment } from './entities/payment.entity';
import { Review } from './entities/review.entity';
import { Loyalty } from './entities/loyalty.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://neondb_owner:npg_DBtGzY53qgka@ep-withered-heart-a2whr26h-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
      ssl: true,
      entities: [
        User,
        MenuCategory,
        MenuItem,
        TableEntity,
        Order,
        OrderItem,
        OrderModifier,
        Payment,
        Review,
        Loyalty,
      ],
      synchronize: false, 
      autoLoadEntities: true,
    }),
    AuthModule,
    UserModule,
    MenuCategoryModule,
    MenuItemModule,
    OrderModule,
    OrderItemModule,
    OrderModifierModule,
    PaymentModule,
    ReviewModule,
    LoyaltyModule,
    DashboardModule,
    TableModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
