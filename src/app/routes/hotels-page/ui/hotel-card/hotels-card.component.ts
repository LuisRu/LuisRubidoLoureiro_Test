import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Hotel } from '../../../../core/models/hotel';

@Component({
  selector: 'app-hotels-card',
  standalone: true,
  imports: [NgOptimizedImage, CurrencyPipe],
  templateUrl: './hotels-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotelsCardComponent {
  hotel = input.required<Hotel>();
}
