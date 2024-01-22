import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { ISelector } from 'common/interfaces';

@Injectable()
export class WebscraperService {
  async scrapeStatic(url: string, selectors: ISelector) {
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

      const data = [];
      for (let i = 0; i < categoryUrls.length; i++) {
        const products = await this.scrapeAll(categoryUrls[i], selectors);
        data.push(products);
      }

      return data.flat();
    } catch (error) {
      console.log(error);
      throw new Error(`Web-scraping error: ${error.message}`);
    }
  }

  async scrapeAll(url: string, selectors: ISelector) {
    let page: number = 1;
    let prev = null;
    const result = [];

    while (true) {
      const data = await this.scrapeStatic(url + `?page=${page}`, selectors);

      if (JSON.stringify(prev) === JSON.stringify(data)) {
        break;
      }

      prev = data;
      result.push(data);
      page++;
    }

    return result.flat();
  }

  private get($: cheerio.CheerioAPI, selectors: ISelector) {
    const products = [];

    $(selectors.product.items).map((i, el) => {
      const name =
        $(el).find(selectors.product.name).text().trim().replaceAll('\n', '') ||
        '';

      const brandString: string[] = selectors.product.brand.split(' ');
      const brand = $(el).find(brandString[0]).attr(brandString[1]) || '';

      const typeString: string[] = selectors.product.type.split(' ');
      const type = $(el).find(typeString[0]).attr(typeString[1]) || '';

      const specifications =
        $(el).find(selectors.product.specifications).text().trim() || '';

      const price =
        parseInt(
          $(el).find(selectors.product.price).text().trim().replace(/\s+/g, ''),
        ) || 0;

      const discount =
        parseInt(
          $(el)
            .find(selectors.product.discount)
            .text()
            .trim()
            .replace(/\s+/g, ''),
        ) || 0;

      products.push({ name, brand, type, specifications, price, discount });
    });

    return products;
  }
}
