import { ChangeDetectionStrategy, Component, computed, effect, inject, Injector, signal } from '@angular/core';
import { HotelsListComponent } from '../../../../shared/hotel-list/hotels-list.component';
import { AutoDestroyService } from '../../../../core/services/utils/auto-destroy.service';
import { HotelsService } from '../../services/hotels.service';
import { Hotel, HotelFilters } from '../../../../core/models/hotel';
import { debounceTime, switchMap, takeUntil } from 'rxjs';
import { HotelFilterComponent } from '../../../../shared/hotels-filter/hotels-filter.component';
import { PRICE_MAX } from '../../../../core/constans/hotel';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-hotels-page',
  standalone: true,
  imports: [HotelsListComponent, HotelFilterComponent],
  providers: [AutoDestroyService],
  templateUrl: './hotels-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotelsPageComponent {

  //Servicios
  private hotelsService = inject(HotelsService);
  private destroy$ = inject(AutoDestroyService);
  private injector = inject(Injector);

  //Filtros signal (componente Hotels-Filter)
  readonly nameFilter = signal<string>('');
  readonly starsFilter = signal<number[]>([]);
  readonly ratingFilter = signal<number>(0);
  readonly priceFilter = signal<number>(PRICE_MAX);

  //Paginación
  readonly pageSize = 12;
  readonly currentPage = signal<number>(1);

  //Datos
  readonly hotels = signal<Hotel[]>([]);
  readonly total = signal<number>(0);


  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.total() / this.pageSize))
  );

  private readonly query = computed<HotelFilters>(() => ({
    page: this.currentPage(),
    limit: this.pageSize,
    name: this.nameFilter() || undefined,
    stars: this.starsFilter(),
    minRate: this.ratingFilter() || undefined,
    maxPrice: this.priceFilter() || undefined
  }));

  constructor() {
    toObservable(this.query, { injector: this.injector })
      .pipe(
        debounceTime(250),
        switchMap(q => this.hotelsService.getHotels(q)),
        takeUntil(this.destroy$)
      )
      .subscribe(({ items, total }) => {
        this.hotels.set(items);
        this.total.set(total);
      });
  }

  onNameFilter(value: string) {
    this.nameFilter.set(value);
    this.currentPage.set(1);
  }

  onCategoriesFilter(values: number[]) {
    this.starsFilter.set(values);
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
    this.starsFilter.set([]);
    this.ratingFilter.set(0);
    this.priceFilter.set(PRICE_MAX);
    this.currentPage.set(1);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
  }
}
