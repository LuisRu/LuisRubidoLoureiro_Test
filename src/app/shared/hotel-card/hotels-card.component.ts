import { Component, input } from '@angular/core';
import { Hotel } from '../../core/models/hotel';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-hotels-card',
  standalone: true,
  imports: [NgOptimizedImage, CurrencyPipe],
  templateUrl: './hotels-card.component.html'
})
export class HotelsCardComponent {
  hotel = input.required<Hotel>();
}
