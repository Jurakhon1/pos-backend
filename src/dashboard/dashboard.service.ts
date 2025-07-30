import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { Payment } from '../entities/payment.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Payment) private paymentRepo: Repository<Payment>,
  ) {}

  async getDashboardMetrics() {
    const now = new Date();
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayEnd.getDate() + 1);

    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);

    const yesterdayEnd = new Date(todayStart);

    // Fetch completed orders for today and yesterday
    const [todayOrders, yesterdayOrders, todayPayments, yesterdayPayments] =
      await Promise.all([
        this.orderRepo.find({
          where: {
            status: 'completed' as any,
            createdAt: Between(todayStart, todayEnd),
          },
        }),
        this.orderRepo.find({
          where: {
            status: 'completed' as any,
            createdAt: Between(yesterdayStart, yesterdayEnd),
          },
        }),
        this.paymentRepo.find({
          where: {
            status: 'completed' as any,
            createdAt: Between(todayStart, todayEnd),
          },
        }),
        this.paymentRepo.find({
          where: {
            status: 'completed' as any,
            createdAt: Between(yesterdayStart, yesterdayEnd),
          },
        }),
      ]);

    // Sum payments for sales
    const sumPayments = (arr: Payment[]) =>
      arr.reduce((acc, p) => acc + Number(p.amount), 0);
    // Count unique customers by created_by field in Order
    const uniqueCustomers = (orders: Order[]) =>
      new Set(orders.map((o) => o.created_by)).size;

    const todaySales = sumPayments(todayPayments);
    const yesterdaySales = sumPayments(yesterdayPayments) || 0.01;

    const todayOrdersCount = todayOrders.length;
    const yesterdayOrdersCount = yesterdayOrders.length || 0.01;

    const todayCustomerCount = uniqueCustomers(todayOrders);
    const yesterdayCustomerCount = uniqueCustomers(yesterdayOrders) || 0.01;

    const avgCheck = todaySales / (todayOrdersCount || 1);
    const avgCheckYesterday = yesterdaySales / yesterdayOrdersCount;

    const toPercent = (today: number, yesterday: number) =>
      ((today - yesterday) / yesterday) * 100;

    return {
      timestamp: now.toISOString(),
      day: now.toLocaleDateString('en-US', { weekday: 'long' }),
      metrics: {
        todaySales: {
          label: "Today's Sales",
          value: parseFloat(todaySales.toFixed(2)),
          change: parseFloat(toPercent(todaySales, yesterdaySales).toFixed(1)),
          currency: 'USD',
        },
        orders: {
          label: 'Orders',
          value: todayOrdersCount,
          change: parseFloat(
            toPercent(todayOrdersCount, yesterdayOrdersCount).toFixed(1),
          ),
        },
        customers: {
          label: 'Customers',
          value: todayCustomerCount,
          change: parseFloat(
            toPercent(todayCustomerCount, yesterdayCustomerCount).toFixed(1),
          ),
        },
        avgCheck: {
          label: 'Average Check',
          value: parseFloat(avgCheck.toFixed(2)),
          change: parseFloat(toPercent(avgCheck, avgCheckYesterday).toFixed(1)),
          currency: 'USD',
        },
      },
    };
  }
}
