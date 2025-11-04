import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PRICE_MAX } from '../../core/constans/hotel';

@Component({
  selector: 'app-hotel-filter',
  imports: [CommonModule],
  standalone:true,
  templateUrl: './hotels-filter.component.html'
})
export class HotelFilterComponent {
  @Input({required:false}) name : string = "";
  @Input() rating = 0;
  @Input() maxPrice = PRICE_MAX;
  @Input() selectedStars: number[] = [];

  @Output() nameChange = new EventEmitter<string>();
  @Output() categoriesChange = new EventEmitter<number[]>();
  @Output() ratingChange = new EventEmitter<number>();
  @Output() priceChange = new EventEmitter<number>();
  @Output() reset = new EventEmitter<void>();


  onNameChange(name: string) {
    this.name = name
    this.nameChange.emit(name);
  }

  onCategoryToggle(star: number, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedStars = [...this.selectedStars, star];
    } else {
      this.selectedStars = this.selectedStars.filter(c => c !== star);
    }
    this.categoriesChange.emit(this.selectedStars);
  }

  onRatingChange(val: string | number) {
    const num = +val;
    this.rating = num;
    this.ratingChange.emit(num);
  }

  onPriceChange(val: string | number) {
    const num = +val;
    this.maxPrice = num;
    this.priceChange.emit(num);
  }

  onReset() {
    this.selectedStars = [];
    this.name = " ";
    this.rating = 0;
    this.maxPrice = PRICE_MAX;

    this.reset.emit();
    this.nameChange.emit('');
    this.categoriesChange.emit([]);
    this.ratingChange.emit(0);
    this.priceChange.emit(PRICE_MAX);
  }
}
