import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @ApiOperation({ summary: 'Get dashboard metrics' })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        timestamp: '2025-07-19T14:15:00+05:00',
        day: 'Saturday',
        metrics: {
          todaySales: {
            label: "Today's Sales",
            value: 28447.5,
            change: 12.5,
            currency: 'USD',
          },
          orders: {
            label: 'Orders',
            value: 47,
            change: 8.2,
          },
          customers: {
            label: 'Customers',
            value: 156,
            change: 15.3,
          },
          avgCheck: {
            label: 'Average Check',
            value: 60.5,
            change: 4.1,
            currency: 'USD',
          },
        },
      },
    },
  })
  getDashboard() {
    return this.dashboardService.getDashboardMetrics();
  }
}
