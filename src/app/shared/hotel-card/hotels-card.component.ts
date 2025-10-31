import { Component, Input } from '@angular/core';
import { Hotel } from '../../core/models/hotel';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-hotels-card',
  imports: [NgOptimizedImage,CurrencyPipe],
  standalone : true,
  templateUrl: './hotels-card.component.html'
})
export class HotelsCardComponent {
  
  @Input({required:true}) hotel : Hotel
}
