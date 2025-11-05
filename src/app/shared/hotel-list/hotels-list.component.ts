import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { HotelsCardComponent } from '../hotel-card/hotels-card.component';
import { Hotel } from '../../core/models/hotel';

@Component({
  selector: 'app-hotels-list',
  standalone: true,
  imports: [HotelsCardComponent],
  templateUrl: './hotels-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotelsListComponent {
  hotels      = input<Hotel[]>([]);
  total       = input(0);
  currentPage = input(1);
  totalPages  = input(1);
  pageSize    = input(12);

  pageChange = output<number>();

  readonly startIndex = computed(() => {
    const total = this.total();
    if (total === 0) return 0;
    return (this.currentPage() - 1) * this.pageSize() + 1;
  });

  readonly endIndex = computed(() => {
    const total = this.total();
    if (total === 0) return 0;
    return this.startIndex() + this.hotels().length - 1;
  });

  readonly pages = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1)
  );

  onPageChange(page: number) {
    this.pageChange.emit(page);
  }
}
