import { ISelector } from 'common/interfaces';

export const selectors: ISelector[] = [
  {
    url: 'https://darwin.md',
    product: {
      items: '.products',
      name: '.title > a',
      specifications: '.specification',
      price: '.price-new',
      discount: '.difprice',
    },
    categories: [],
    category: {
      items: '',
    },
  },
  {
    url: 'https://enter.online',
    product: {
      items: '.product-card > div',
      name: '.product-title',
      specifications: '.product-descr',
      price: '.grid-price > span',
      discount: '.discount',
    },
    categories: [],
    category: {
      items: '.category_block',
    },
  },
  {
    url: 'https://smart.md',
    product: {
      items: '',
      name: '.custom_product_title > h4',
      specifications: '',
      price: '.custom_product_price > .regular',
      discount: '.custom_product_price > .special',
    },
    categories: [],
    category: {
      items: '',
    },
  },
];
