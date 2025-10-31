import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { HotelsCardComponent } from '../hotel-card/hotels-card.component';
import { Hotel } from '../../core/models/hotel';

@Component({
  selector: 'app-hotels-list',
  standalone: true,
  imports: [HotelsCardComponent],
  templateUrl: './hotels-list.component.html',
})
export class HotelsListComponent {
  @Input() hotels: Hotel[] = [];
  @Input() total = 0;
  @Input() currentPage = 1;
  @Input() totalPages = 1;

  @Output() pageChange = new EventEmitter<number>();

  onPageChange(page: number) {
    this.pageChange.emit(page);
  }
}
