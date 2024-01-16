import { ISelector } from 'common/interfaces';

export const selectors: ISelector[] = [
  {
    url: 'https://darwin.md',
    config: {
      items: '.products',
      name: '.title > a',
      specification: '.specification',
      price: '.price-new',
      discount: '.difprice',
    },
  },
  {
    url: 'https://enter.online',
    config: {
      items: '.row.rowlast',
      name: '.product-title',
      specification: 'product-descr',
      price: '.price-new',
      discount: '.discount',
    },
  },
  {
    url: 'https://smart.md',
    config: {
      items: '',
      name: '.custom_product_title > h4',
      specification: '',
      price: '.custom_product_price > .regular',
      discount: '.custom_product_price > .special',
    },
  },
];
