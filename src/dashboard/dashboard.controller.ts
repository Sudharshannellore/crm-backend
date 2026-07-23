import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  getStats() {
    return this.dashboardService.getStats();
  }

  @Get('revenue')
  getRevenue() {
    return this.dashboardService.getRevenue();
  }

  @Get('activity')
  getActivity() {
    return this.dashboardService.getActivity();
  }

  @Get('conversion-funnel')
  getConversionFunnel() {
    return this.dashboardService.getConversionFunnel();
  }
}
