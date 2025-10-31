import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-hotel-filter',
  imports: [CommonModule],
  standalone:true,
  templateUrl: './hotels-filter.component.html'
})
export class HotelFilterComponent {
  @Input() rating = 0;
  @Input() maxPrice = 1000;
  @Input() selectedCategories: number[] = [];

  @Output() nameChange = new EventEmitter<string>();
  @Output() categoriesChange = new EventEmitter<number[]>();
  @Output() ratingChange = new EventEmitter<number>();
  @Output() priceChange = new EventEmitter<number>();
  @Output() reset = new EventEmitter<void>();


  onNameChange(name: string) {
    console.log(name)
    this.nameChange.emit(name);
  }

  onCategoryToggle(star: number, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedCategories = [...this.selectedCategories, star];
    } else {
      this.selectedCategories = this.selectedCategories.filter(c => c !== star);
    }
    this.categoriesChange.emit(this.selectedCategories);
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
    this.selectedCategories = [];
    this.rating = 0;
    this.maxPrice = 1000;

    this.reset.emit();
    this.nameChange.emit('');
    this.categoriesChange.emit([]);
    this.ratingChange.emit(0);
    this.priceChange.emit(1000);
  }
}
