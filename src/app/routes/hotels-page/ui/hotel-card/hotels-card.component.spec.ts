import { TestBed } from '@angular/core/testing';
import { HotelsCardComponent } from './hotels-card.component';
import { Hotel } from '../../../../core/models/hotel';

describe('HotelsCardComponent (mínimo)', () => {
  const HOTEL: Hotel = {
    id: '1',
    name: 'A Hotel',
    image: 'img.jpg',
    address: 'Street 1',
    stars: 4,
    rate: 4.5,
    price: 120
  };

  it('acepta el input hotel', () => {
    const fixture = TestBed.configureTestingModule({
      imports: [HotelsCardComponent]
    }).createComponent(HotelsCardComponent);

    fixture.componentRef.setInput('hotel', HOTEL);
    fixture.detectChanges();

    expect(fixture.componentInstance.hotel()).toEqual(HOTEL);
  });
});
