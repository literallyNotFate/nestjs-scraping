import { ISelector } from 'common/interfaces';
import { Controller, Get, Query } from '@nestjs/common';
import { WebscraperService } from './module/webscraper/webscraper.service';
import { selectors } from 'common/config/selectors.config';

@Controller()
export class AppController {
  constructor(private readonly webScraperService: WebscraperService) {}

  @Get('/scrape')
  async scrape(@Query('url') url: string): Promise<any> {
    if (!url) {
      throw new Error('URL was not specified');
    }

    const selector: ISelector = selectors.filter((x) => url.includes(x.url))[0];
    return this.webScraperService.scrapeWebsite(url, selector);
  }
}
