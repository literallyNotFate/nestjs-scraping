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

      const products = this.getProducts($, selectors);
      return products;
    } catch (error) {
      throw new Error(`Web-scraping error: ${error.message}`);
    }
  }

  async scrapeCategory(category: string, selectors: ISelector) {
    try {
      const finalUrl: string = selectors.url + '/' + category;
      const response = await axios.get(finalUrl);
      const $ = cheerio.load(response.data);

      const categoryUrls = $('.category_block')
        .find('a')
        .map((index, data) => $(data).attr('href'))
        .get();

      const results = await Promise.all(
        categoryUrls.map((x) => axios.get(x).then((res) => res.data)),
      );

      const parsed = [];
      for (let i = 0; i < categoryUrls.length; i++) {
        const $pr = cheerio.load(results[i]);
        const products = this.getProducts($pr, selectors);
        parsed.push(products);
      }

      return parsed;
    } catch (error) {
      throw new Error(`Web-scraping error: ${error.message}`);
    }
  }

  private getProducts($: cheerio.CheerioAPI, selectors: ISelector) {
    const products = [];
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

      products.push(data);
    }

    return products;
  }
}
