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
      return this.get($, selectors);
    } catch (error) {
      throw new Error(`Web-scraping error: ${error.message}`);
    }
  }

  async scrapeCategory(category: string, selectors: ISelector) {
    try {
      const finalUrl: string = selectors.url + '/' + category;
      const response = await axios.get(finalUrl);
      const $ = cheerio.load(response.data);

      const categoryUrls = $(selectors.category.items)
        .find('a')
        .map((i, data) => $(data).attr('href'))
        .get();

      const results = await Promise.all(
        categoryUrls.map((x) => axios.get(x).then((res) => res.data)),
      );

      const parsed = [];
      for (let i = 0; i < categoryUrls.length; i++) {
        const $pr = cheerio.load(results[i]);
        const products = this.get($pr, selectors);
        parsed.push(products);
      }

      return parsed;
    } catch (error) {
      throw new Error(`Web-scraping error: ${error.message}`);
    }
  }

  private get($: cheerio.CheerioAPI, selectors: ISelector) {
    const products = [];

    $(selectors.product.items).map((i, el) => {
      const name = $(el)
        .find(selectors.product.name)
        .text()
        .trim()
        .replaceAll('\n', '');

      //   const brand = $(el)
      //     .find(selectors.product.specifications)
      //     .attr('data-brand');

      const specifications = $(el)
        .find(selectors.product.specifications)
        .text()
        .trim();

      const price = parseInt(
        $(el).find(selectors.product.price).text().trim().replace(/\s+/g, ''),
      );
      const discount =
        parseInt(
          $(el)
            .find(selectors.product.discount)
            .text()
            .trim()
            .replace(/\s+/g, ''),
        ) || 0;

      products.push({ name, specifications, price, discount });
    });

    return products;
  }
}
