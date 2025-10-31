import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HotelsService } from './hotels.service';
import { environment } from '../../../../environment/environment';
import { Hotel } from '../../../core/models/hotel';

describe('HotelsService', () => {
  let service: HotelsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HotelsService]
    });

    service = TestBed.inject(HotelsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería crearse', () => {
    expect(service).toBeTruthy();
  });

  it('debería hacer GET a la URL de hoteles y guardar el resultado en el signal', () => {
    const mockHotels: Hotel[] = [
      { id: '1', name: 'Hotel Test', image: '', address: 'Calle 1', stars: 4, rate: 4.6, price: 120 },
      { id: '2', name: 'Hotel Test 2', image: '', address: 'Calle 2', stars: 3, rate: 4.1, price: 90 }
    ];

 
    service.getHotels().subscribe((resp) => {
      // aquí ya debería llegarnos mockHotels
      expect(resp).toEqual(mockHotels);
    });

  
    const req = httpMock.expectOne(environment.BASE_API_URL);
    expect(req.request.method).toBe('GET');


    req.flush(mockHotels);


    expect(service.$hotels()).toEqual(mockHotels);
  });

  it('debería permitir setHotels manualmente', () => {
    const manualHotels: Hotel[] = [
      { id: '3', name: 'Manual Hotel', image: '', address: 'Calle 3', stars: 5, rate: 5, price: 300 }
    ];

    service.setHotels(manualHotels);

    expect(service.$hotels()).toEqual(manualHotels);
  });
});
