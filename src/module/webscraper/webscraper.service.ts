import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { ISelector } from 'common/interfaces';

@Injectable()
export class WebscraperService {
  async scrapeWebsite(url: string, selectors: ISelector) {
    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      const result = [];
      const names = $(selectors.config.name)
        .map((index, data) => $(data).text().replaceAll('\n', ''))
        .get();

      const specification = $(selectors.config.specification)
        .map((index, data) => $(data).text().trim())
        .get();

      const price = $(selectors.config.price)
        .map((index, data) => $(data).text().trim())
        .get();

      const discount = $(selectors.config.discount)
        .map((index, data) => $(data).text().trim())
        .get();

      for (let i = 0; i < names.length; i++) {
        const data = {
          name: names[i],
          specification: specification[i],
          price: price[i],
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
