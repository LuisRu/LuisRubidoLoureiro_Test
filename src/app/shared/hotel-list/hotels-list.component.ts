import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() hotels: Hotel[] = [];
  @Input() total = 0;
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Input() pageSize = 12;

  @Output() pageChange = new EventEmitter<number>();

  get startIndex(): number {
    if (this.total === 0) return 0;
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endIndex(): number {
    if (this.total === 0) return 0;
    return this.startIndex + this.hotels.length - 1;
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onPageChange(page: number) {
    this.pageChange.emit(page);
  }
}
