import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { HotelsListComponent } from '../../../../shared/hotel-list/hotels-list.component';
import { AutoDestroyService } from '../../../../core/services/utils/auto-destroy.service';
import { HotelsService } from '../../services/hotels.service';
import { Hotel } from '../../../../core/models/hotel';
import { takeUntil } from 'rxjs';
import { HotelFilterComponent } from '../../../../shared/hotels-filter/hotels-filter.component';

@Component({
  selector: 'app-hotels-page',
  standalone: true,
  imports: [HotelsListComponent, HotelFilterComponent],
  providers: [AutoDestroyService],
  templateUrl: './hotels-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotelsPageComponent {
  
  private hotelsService = inject(HotelsService);
  private destroy$ = inject(AutoDestroyService);

  readonly nameFilter = signal<string>('');
  readonly categoriesFilter = signal<number[]>([]);
  readonly ratingFilter = signal<number>(0);
  readonly priceFilter = signal<number>(1000);

  readonly pageSize = 12;
  readonly currentPage = signal<number>(1);

  readonly hotels = signal<Hotel[]>([]);
  readonly total = signal<number>(0);

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.total() / this.pageSize))
  );

  private readonly query = computed(() => ({
    page: this.currentPage(),
    limit: this.pageSize,
    name: this.nameFilter() || undefined,
    categories: this.categoriesFilter(),
    minRating: this.ratingFilter() || undefined,
    maxPrice: this.priceFilter() || undefined
  }));

  constructor() {
    effect(() => {
      const q = this.query();
      this.hotelsService
        .getHotels(q)
        .pipe(takeUntil(this.destroy$))
        .subscribe(({ items, total }) => {
          this.hotels.set(items);
          this.total.set(total);
        });
    });
  }

  onNameFilter(value: string) {
    this.nameFilter.set(value);
    this.currentPage.set(1);
  }

  onCategoriesFilter(values: number[]) {
    this.categoriesFilter.set(values);
    this.currentPage.set(1);
  }

  onRatingFilter(value: number) {
    this.ratingFilter.set(value);
    this.currentPage.set(1);
  }

  onPriceFilter(value: number) {
    this.priceFilter.set(value);
    this.currentPage.set(1);
  }

  onResetFilters() {
    this.nameFilter.set('');
    this.categoriesFilter.set([]);
    this.ratingFilter.set(0);
    this.priceFilter.set(1000);
    this.currentPage.set(1);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
  }
}
