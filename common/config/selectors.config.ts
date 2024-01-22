import { ISelector } from 'common/interfaces';

export const selectors: ISelector[] = [
  {
    name: 'Darwin',
    url: 'https://darwin.md',
    product: {
      items: '.row.rowlast > div:has(figure)',
      name: '.title > a',
      brand: '.info-wrap data-brand',
      type: '.info-wrap data-categ',
      specifications: '.specification',
      price: '.price-new',
      discount: '.difprice',
    },
    categories: [],
    category: {
      items: '.card.card-product',
    },
    isDynamic: false,
  },
  {
    name: 'Enter',
    url: 'https://enter.online',
    product: {
      items: '.product-card > div',
      name: '.product-title',
      brand: '.product-descr data-brand',
      type: '.product-descr data-categ',
      specifications: '.product-descr',
      price: '.grid-price > span',
      discount: '.discount',
    },
    categories: [],
    category: {
      items: '.category_block',
    },
    isDynamic: false,
  },
  {
    name: 'Smart',
    url: 'https://smart.md',
    product: {
      items: '',
      name: '.custom_product_title > h4',
      brand: '',
      type: '',
      specifications: '',
      price: '.custom_product_price > .regular',
      discount: '.custom_product_price > .special',
    },
    categories: [],
    category: {
      items: '',
    },
    isDynamic: true,
  },
];
