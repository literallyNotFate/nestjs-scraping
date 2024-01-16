export interface ISelector {
  url: string;
  config: ISelectorConfig;
}

interface ISelectorConfig {
  items: string;
  name: string;
  specification: string;
  price: string;
  discount: string;
}
