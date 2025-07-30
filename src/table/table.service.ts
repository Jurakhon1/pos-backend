import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TableEntity, TableStatusEnum } from '../entities/table-entity.entity';
import { Order } from '../entities/order.entity';
import { Payment } from '../entities/payment.entity';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';

@Injectable()
export class TableService {
  constructor(
    @InjectRepository(TableEntity)
    private tableRepo: Repository<TableEntity>,
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
    @InjectRepository(Payment)
    private paymentRepo: Repository<Payment>,
  ) {}

  async findAll() {
    const tables = await this.tableRepo.find({ relations: ['orders'] });

    for (const table of tables) {
      const completedOrders = table.orders.filter(
        (order) => order.status === 'completed',
      );
      const orderIds = completedOrders.map((o) => o.id);

      if (orderIds.length > 0) {
        const payments = await this.paymentRepo
          .createQueryBuilder('payment')
          .where('payment.orderId IN (:...orderIds)', { orderIds })
          .andWhere('payment.status = :status', { status: 'completed' })
          .getMany();

        table.total = payments.reduce((sum, p) => sum + Number(p.amount), 0);
      } else {
        table.total = null;
      }
    }

    return tables;
  }

  async findOne(id: number) {
    const table = await this.tableRepo.findOneBy({ id });
    if (!table) throw new NotFoundException('Стол не найден');
    return table;
  }

  async findByStatus(status: TableStatusEnum) {
    return this.tableRepo.find({ where: { status } });
  }

  async create(data: CreateTableDto) {
    if (data.status === TableStatusEnum.RESERVED && data.reservation_time) {
      const existing = await this.tableRepo.findOneBy({ id: data.reserved_by });
      if (existing && existing.status === TableStatusEnum.RESERVED) {
        throw new ConflictException('Стол уже забронирован');
      }
    }

    const table = this.tableRepo.create(data);
    return this.tableRepo.save(table);
  }

  async update(id: number, data: TableEntity) {
    const table = await this.tableRepo.findOneBy({ id });
    if (!table) throw new NotFoundException('Стол не найден');

    if (data.status === TableStatusEnum.RESERVED && data.reservation_time) {
      const now = new Date();
      const existingTime = table.reservation_time
        ? new Date(table.reservation_time)
        : null;

      if (
        table.status === TableStatusEnum.RESERVED &&
        existingTime &&
        existingTime > now
      ) {
        throw new ConflictException('Стол уже забронирован');
      }
    }

    // Transform reservation_duration to match PostgreSQL interval format
    if (data.reservation_duration) {
      data.reservation_duration = `PT${data.reservation_duration}`; // Assuming duration is in ISO 8601 format
    }

    await this.tableRepo.update(id, data);
    return this.tableRepo.findOneBy({ id });
  }

  async remove(id: number) {
    const table = await this.tableRepo.findOneBy({ id });
    if (!table) throw new NotFoundException('Стол не найден');
    return this.tableRepo.delete(id);
  }
}
