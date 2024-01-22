import { ISelector } from 'common/interfaces';
import { Controller, Get, Query } from '@nestjs/common';
import { WebscraperService } from './module/webscraper/webscraper.service';
import { selectors } from 'common/config/selectors.config';

@Controller()
export class AppController {
  constructor(private readonly webScraperService: WebscraperService) {}

  @Get('/scrape')
  async scrape(@Query('q') url: string): Promise<any> {
    if (!url) {
      throw new Error('URL was not specified');
    }

    const selector: ISelector = selectors.filter((x) => url.includes(x.url))[0];
    return this.webScraperService.scrapeStatic(url, selector);
  }

  @Get('/scrapeAll')
  async scrapeAll(@Query('q') url: string): Promise<any> {
    if (!url) {
      throw new Error('URL was not specified');
    }

    const selector: ISelector = selectors.filter((x) => url.includes(x.url))[0];
    return this.webScraperService.scrapeAll(url, selector);
  }

  @Get('/category')
  async category(
    @Query('r') resource: string,
    @Query('q') category: string,
  ): Promise<any> {
    if (!category || !resource) {
      throw new Error('Category or resource were not specified');
    }

    const selector: ISelector = selectors.filter(
      (x) => x.name.toLowerCase() == resource.toLowerCase(),
    )[0];
    return this.webScraperService.scrapeCategory(category, selector);
  }
}
