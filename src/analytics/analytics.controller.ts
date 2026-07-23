import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('revenue-by-month')
  getRevenueByMonth() {
    return this.analyticsService.getRevenueByMonth();
  }

  @Get('leads-by-source')
  getLeadsBySource() {
    return this.analyticsService.getLeadsBySource();
  }

  @Get('team-performance')
  getTeamPerformance() {
    return this.analyticsService.getTeamPerformance();
  }

  @Get('forecast')
  getForecast() {
    return this.analyticsService.getForecast();
  }

  @Get('segments')
  getSegments() {
    return this.analyticsService.getSegments();
  }
}
