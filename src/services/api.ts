import { PriceSource, Ticker } from "../common/types";

export const getSources = (): Promise<PriceSource[]> => {
    return fetch(`${process.env.REACT_APP_API}/priceSources`).then((response) => (response.json() as unknown) as PriceSource[]);
};

export const getTickers = (): Promise<PriceSource[]> => {
    return fetch(`${process.env.REACT_APP_API}/tickers`).then((response) => (response.json() as unknown) as Ticker[]);
};