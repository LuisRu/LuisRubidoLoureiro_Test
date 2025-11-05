import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HotelsListComponent } from '../../../../shared/hotel-list/hotels-list.component';
import { HotelsService } from '../../services/hotels.service';
import { HotelFilterComponent } from '../../../../shared/hotels-filter/hotels-filter.component';
import { PRICE_MAX } from '../../../../core/constans/hotel';

@Component({
  selector: 'app-hotels-page',
  standalone: true,
  imports: [HotelsListComponent, HotelFilterComponent],
  templateUrl: './hotels-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotelsPageComponent {
  hs = inject(HotelsService);

  onNameFilter(v: string)         { this.hs.setName(v); }
  onCategoriesFilter(v: number[]) { this.hs.setStars(v); }
  onRatingFilter(v: number)       { this.hs.setRating(v); }
  onPriceFilter(v: number)        { this.hs.setPrice(v); }
  onResetFilters()                { this.hs.resetFilters(PRICE_MAX); }
  goToPage(p: number)             { if (p>=1 && p<=this.hs.totalPages()) this.hs.setPage(p); }
}
