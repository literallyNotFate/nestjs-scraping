import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async scrape(url: string): Promise<any> {
    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      const result = [];
      const names = $('.title > a')
        .map((index, data) => $(data).text().replaceAll('\n', ''))
        .get();

      const specification = $('.specification')
        .map((index, data) => $(data).text().trim())
        .get();

      const newPrice = $('.price-new')
        .map((index, data) => $(data).text().trim())
        .get();

      const discount = $('.difprice')
        .map((index, data) => $(data).text().trim())
        .get();

      for (let i = 0; i < names.length; i++) {
        const data = {
          name: names[i],
          specification: specification[i],
          newPrice: newPrice[i],
          discount: discount[i],
        };

        result.push(data);
      }

      return result;
    } catch (error) {
      throw new Error(`Web-scraping error: ${error.message}`);
    }
  }
}
