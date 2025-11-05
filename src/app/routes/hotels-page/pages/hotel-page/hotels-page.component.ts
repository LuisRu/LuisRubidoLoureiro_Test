import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HotelsListComponent } from '../../ui/hotel-list/hotels-list.component';
import { HotelFilterComponent } from '../../ui/hotels-filter/hotels-filter.component';
import { HotelsService } from '../../services/hotels.service';
import { PRICE_MAX } from '../../../../core/constans/hotel';
import { ActivatedRoute, Router } from '@angular/router';
import { effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-hotels-page',
  standalone: true,
  imports: [HotelsListComponent, HotelFilterComponent],
  templateUrl: './hotels-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotelsPageComponent {
  hs = inject(HotelsService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private qpMap = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap
  });

  constructor() {
    effect(() => {
      const qp = this.qpMap();
      const page = +(qp.get('page') ?? '1');
      const name = qp.get('name') ?? '';
      const stars = qp.getAll('stars').map(Number).filter(n => !Number.isNaN(n));
      const rating = +(qp.get('rating') ?? '0');
      const price = +(qp.get('price') ?? String(PRICE_MAX));

      if (page > 0 && page !== this.hs.currentPage()) this.hs.setPage(page);
      if (name !== this.hs.nameFilter()) this.hs.setName(name);
      if (JSON.stringify(stars) !== JSON.stringify(this.hs.starsFilter())) this.hs.setStars(stars);
      if (!Number.isNaN(rating) && rating !== this.hs.ratingFilter()) this.hs.setRating(rating);
      if (!Number.isNaN(price) && price !== this.hs.priceFilter()) this.hs.setPrice(price);
    });
  }

  onNameFilter(v: string) {
    this.navigateWithParams({ name: v?.trim() || null, page: 1 }, true);
  }
  onCategoriesFilter(v: number[]) {
    this.navigateWithParams({ stars: v?.length ? v : null, page: 1 }, true);
  }
  onRatingFilter(v: number) {
    this.navigateWithParams({ rating: v || null, page: 1 }, true);
  }
  onPriceFilter(v: number) {
    this.navigateWithParams({ price: Number.isFinite(v) ? v : null, page: 1 }, true);
  }

  goToPage(p: number) {
    if (p >= 1 && p <= this.hs.totalPages()) {
      this.navigateWithParams({ page: p }, false);
    }
  }

  private navigateWithParams(partial: {
    name?: string | null;
    stars?: number[] | null;
    rating?: number | null;
    price?: number | null;
    page?: number | null;
  }, replace: boolean) {
    const curr = this.qpObject();
    const next: any = {
      ...curr,
      ...(partial.name !== undefined ? { name: partial.name } : {}),
      ...(partial.stars !== undefined ? { stars: partial.stars } : {}),
      ...(partial.rating !== undefined ? { rating: partial.rating } : {}),
      ...(partial.price !== undefined ? { price: partial.price } : {}),
      ...(partial.page !== undefined ? { page: partial.page } : {})
    };

    for (const k of Object.keys(next)) {
      const v = next[k];
      if (v === null || v === '' || (Array.isArray(v) && v.length === 0)) {
        delete next[k];
      }
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: next,
      replaceUrl: replace
    });
  }

  private qpObject() {
    const qp = this.qpMap();
    const obj: Record<string, any> = {};
    qp.keys.forEach(k => {
      const vals = qp.getAll(k);
      obj[k] = vals.length > 1 ? vals : vals[0];
    });
    return obj;
  }
}
