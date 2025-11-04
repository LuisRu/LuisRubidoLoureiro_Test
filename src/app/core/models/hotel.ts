export type Star = 1 | 2 | 3 | 4 | 5;

export interface Hotel {
  id: string;
  name: string;
  image: string;
  address: string;
  stars: Star;
  rate: number;
  price: number;
}


export interface HotelsResult {
  items: Hotel[];
  total: number;
}

export interface HotelFilters {
  page: number;
  limit: number;
  name?: string;
  stars?: Star[];
  minRate?: number;
  maxPrice?: number;
}

export interface Paged<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export const PRICE_MIN = 50;
export const PRICE_MAX = 1000;
export const RATE_MIN = 0;
export const RATE_MAX = 5;
