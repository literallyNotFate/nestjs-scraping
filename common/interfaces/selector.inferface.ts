export interface ISelector {
  url: string;
  product: ISelectorConfig;
  categories: string[];
  category: ICategoryConfig;
}

interface ISelectorConfig {
  items: string;
  name: string;
  specifications: string;
  price: string;
  discount: string;
}

interface ICategoryConfig {
  items: string;
}
