import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-hotel-filter',
  standalone: true,
  imports: [CommonModule]
  , templateUrl: './hotels-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotelFilterComponent {
  rating = input(0);
  maxPrice = input<number>(0);
  selectedStars = input<number[]>([]);

  nameChange = output<string>();
  categoriesChange = output<number[]>();
  ratingChange = output<number>();
  priceChange = output<number>();

  onNameInput(v: string) {
    this.nameChange.emit(v);
  }
  handleStarsToggle(event: Event, star: number) {
    const checked = (event.target as HTMLInputElement).checked;
    const next = new Set(this.selectedStars()); 
    if (checked) next.add(star); else next.delete(star);
    this.categoriesChange.emit(Array.from(next).sort((a, b) => a - b));
  }

  onRatingInput(v: number) {
    this.ratingChange.emit(v);
  }
  onPriceInput(v: number) {
    this.priceChange.emit(v);
  }

  handlePriceInput(event: Event) {
    const value = Number((event.target as HTMLInputElement).value);
    this.priceChange.emit(value);
  }

  handleRatingInput(event: Event) {
    const value = Number((event.target as HTMLInputElement).value);
    this.ratingChange.emit(value);
  }

  handleNameInput(event: Event) {
    this.nameChange.emit((event.target as HTMLInputElement).value);
  }


}
