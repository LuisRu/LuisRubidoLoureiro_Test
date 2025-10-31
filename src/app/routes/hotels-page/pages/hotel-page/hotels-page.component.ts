import { Component, computed, effect, inject, signal } from '@angular/core';
import { HotelsListComponent } from '../../../../shared/hotel-list/hotels-list.component';
import { AutoDestroyService } from '../../../../core/services/utils/auto-destroy.service';
import { HotelsService } from '../../services/hotels.service';
import { HotelFilterComponent } from '../../../../shared/hotels-filter/hotels-filter.component';
import { Hotel } from '../../../../core/models/hotel';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-hotels-page',
  standalone: true,
  imports: [HotelsListComponent, HotelFilterComponent],
  providers: [AutoDestroyService],
  templateUrl: './hotels-page.component.html'
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

  readonly allHotels = this.hotelsService.$hotels;

  readonly filteredHotels = computed<Hotel[]>(() => {
    const name = this.nameFilter().toLowerCase();
    const cats = this.categoriesFilter();
    const minRating = this.ratingFilter();
    const maxPrice = this.priceFilter();

    return this.allHotels().filter(h => {
      const matchesName = !name || h.name.toLowerCase().includes(name);
      const matchesCat = cats.length === 0 || cats.includes(h.stars);
      const matchesRating = h.rate >= minRating;
      const matchesPrice = h.price <= maxPrice;
      return matchesName && matchesCat && matchesRating && matchesPrice;
    });
  });

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredHotels().length / this.pageSize))
  );

  readonly pagedHotels = computed<Hotel[]>(() => {
    const page = this.currentPage();
    const start = (page - 1) * this.pageSize;
    return this.filteredHotels().slice(start, start + this.pageSize);
  });

  constructor() {
    this.hotelsService
      .getHotels()
      .pipe(takeUntil(this.destroy$))
      .subscribe();

    effect(() => {
      this.nameFilter();
      this.categoriesFilter();
      this.ratingFilter();
      this.priceFilter();
      this.currentPage.set(1);
    });
  }

  onNameFilter(value: string) {
    this.nameFilter.set(value);
  }

  onCategoriesFilter(values: number[]) {
    this.categoriesFilter.set(values);
  }

  onRatingFilter(value: number) {
    this.ratingFilter.set(value);
  }

  onPriceFilter(value: number) {
    this.priceFilter.set(value);
  }

  onResetFilters() {
    this.nameFilter.set('');
    this.categoriesFilter.set([]);
    this.ratingFilter.set(0);
    this.priceFilter.set(1000);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
  }
}
