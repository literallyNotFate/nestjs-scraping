import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/scrape')
  async scrape(@Query('url') url: string): Promise<any> {
    if (!url) {
      throw new Error('URL was not specified');
    }

    return this.appService.scrape(url);
  }
}
