

export interface Hotel {
  id: string;
  name: string;
  image: string;
  address: string;
  stars: number;
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
  stars?: number[];
  minRate?: number;
  maxPrice?: number;
}

export interface Paged<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}


