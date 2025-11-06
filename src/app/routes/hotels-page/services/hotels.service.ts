import { Injectable, computed, inject, Injector, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Hotel } from '../../../core/models/hotel';
import { environment } from '../../../../environment/environment';

@Injectable({ providedIn: 'root' })
export class HotelsService {
  private injector = inject(Injector);

  readonly pageSize    = 12;
  readonly currentPage = signal(1);
  readonly nameFilter  = signal('');
  readonly starsFilter = signal<number[]>([]);
  readonly ratingFilter = signal(0);
  readonly priceFilter  = signal(Infinity);

  private readonly debouncedName = signal('');
  private debounceId: any;
  setName(v: string) {
    this.nameFilter.set(v);
    clearTimeout(this.debounceId);
    this.debounceId = setTimeout(() => this.debouncedName.set(v), 250);
    this.setPage(1);
  }

  setStars(v: number[]) { this.starsFilter.set(v); this.setPage(1); }
  setRating(v: number)  { this.ratingFilter.set(v); this.setPage(1); }
  setPrice(v: number)   { this.priceFilter.set(v); this.setPage(1); }
  setPage(p: number)    { this.currentPage.set(p); }

  resetFilters(maxPrice: number) {
    this.nameFilter.set('');
    this.starsFilter.set([]);
    this.ratingFilter.set(0);
    this.priceFilter.set(maxPrice);
    this.currentPage.set(1);
  }

  private readonly query = computed(() => ({
    page: this.currentPage(),
    limit: this.pageSize,
    name: this.debouncedName(),
    stars: this.starsFilter(),
    minRate: this.ratingFilter(),
    maxPrice: this.priceFilter()
  }));

  private readonly url = computed(() => {
    const q = this.query();
    const p = new URLSearchParams();
    p.set('_page',  String(q.page));
    p.set('_limit', String(q.limit));
    if (q.name.trim())        p.set('name_like', q.name.trim());
    if (q.minRate)            p.set('rate_gte', String(q.minRate));
    if (isFinite(q.maxPrice)) p.set('price_lte', String(q.maxPrice));
    q.stars.forEach(s => p.append('stars', String(s)));
    return `${environment.BASE_API_URL}?${p.toString()}`;
  });

  readonly hotelsRes = httpResource<Hotel[]>(
    () => this.url(),
    { injector: this.injector }
  );

  readonly hotels     = computed(() => this.hotelsRes.value() ?? []);
  readonly isLoading  = computed(() => this.hotelsRes.isLoading());
  readonly error      = computed(() => this.hotelsRes.error());
  readonly total      = computed(() =>
    Number(this.hotelsRes.headers()?.get('X-Total-Count') ?? 0)
  );
  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.total() / this.pageSize))
  );

}
