import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { HotelsService } from './hotels.service';
import { Hotel } from '../../../core/models/hotel';

describe('HotelsService', () => {
  let service: HotelsService;
  let httpMock: HttpTestingController;

  const HOTELS: Hotel[] = [
    { id: '1', name: 'A', image: '', address: '', stars: 3, rate: 4.2, price: 110 },
    { id: '2', name: 'B', image: '', address: '', stars: 4, rate: 4.7, price: 180 }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), HotelsService]
    });
    service = TestBed.inject(HotelsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('carga inicial mínima', () => {
    void service.hotelsRes.value();

    const req = httpMock.expectOne(() => true);
    req.flush(HOTELS, { headers: { 'X-Total-Count': '24' } as any });

    expect(service.hotels()).toEqual(HOTELS);
    expect(service.total()).toBe(24);
    expect(service.totalPages()).toBe(2);
  });
});
