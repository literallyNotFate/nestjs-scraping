export interface ISelector {
  name: string;
  url: string;
  product: ISelectorConfig;
  categories: string[];
  category: ICategoryConfig;
  isDynamic: boolean;
}

interface ISelectorConfig {
  items: string;
  name: string;
  brand: string;
  type: string;
  specifications: string;
  price: string;
  discount: string;
}

interface ICategoryConfig {
  items: string;
}
