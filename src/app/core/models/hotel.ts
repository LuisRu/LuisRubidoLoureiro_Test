// src/app/core/models/hotel.model.ts

/** Estrellas válidas (1..5) */
export type Star = 1 | 2 | 3 | 4 | 5;

/** Modelo principal de Hotel (dominio) */
export interface Hotel {
  id: string;        // UUID
  name: string;      // Nombre del hotel
  image: string;     // URL de imagen
  address: string;   // Dirección
  stars: Star;       // 1..5
  rate: number;      // 0..5 (puede tener decimales)
  price: number;     // € (>= 0)
}

/** Filtros requeridos por la prueba */
export interface HotelFilters {
  /** Contiene en cualquier parte del nombre (case-insensitive) */
  name?: string;

  /** Categorías múltiples seleccionadas (checkboxes) */
  stars?: Star[];

  /** Mostrar con valoración >= minRate (range 0..5) */
  minRate?: number;

  /** Mostrar con precio <= maxPrice (range 50..1000) */
  maxPrice?: number;
}

/** Estructura de respuesta paginada (útil si haces server-side o para la UI) */
export interface Paged<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

/** Constantes útiles del enunciado */
export const PRICE_MIN = 50;
export const PRICE_MAX = 1000;
export const RATE_MIN = 0;
export const RATE_MAX = 5;

/** Type guard sencillo por si validas datos en runtime */
export function isHotel(x: unknown): x is Hotel {
  if (typeof x !== 'object' || x === null) return false;
  const h = x as Record<string, unknown>;
  const starsOk = [1, 2, 3, 4, 5].includes(h['stars'] as number);
  const rateOk = typeof h['rate'] === 'number' && h['rate'] >= RATE_MIN && h['rate'] <= RATE_MAX;
  const priceOk = typeof h['price'] === 'number' && h['price'] >= 0;
  return (
    typeof h['id'] === 'string' &&
    typeof h['name'] === 'string' &&
    typeof h['image'] === 'string' &&
    typeof h['address'] === 'string' &&
    starsOk &&
    rateOk &&
    priceOk
  );
}
