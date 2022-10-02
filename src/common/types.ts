
export type PriceSource = {
  id: number;
  name: string;
}

export type Ticker = {
  id: number;
  name: string;
}

export type Price = {
  id: number;
  sourceId: number;
  tickerId: number;
  price: number;
  time: string;
}