import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { of } from 'rxjs';
import { HotelsPageComponent } from './hotels-page.component';
import { HotelsService } from '../../services/hotels.service';
import { Hotel } from '../../../../core/models/hotel';

const MOCK_HOTELS: Hotel[] = [
  { id: '1', name: 'Hotel Azul', image: '', address: '', stars: 3, rate: 4.5, price: 200 },
  { id: '2', name: 'Hotel Rojo', image: '', address: '', stars: 5, rate: 4.9, price: 500 },
  { id: '3', name: 'Pensión Barata', image: '', address: '', stars: 1, rate: 2.1, price: 50 },
  { id: '4', name: 'Hotel Medio', image: '', address: '', stars: 3, rate: 3.2, price: 120 }
];

class HotelsServiceMock {
  $hotels = signal<Hotel[]>(MOCK_HOTELS);
  getHotels = jasmine.createSpy('getHotels').and.returnValue(of(MOCK_HOTELS));
}

describe('HotelsPageComponent', () => {
  let component: HotelsPageComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HotelsPageComponent],
      providers: [{ provide: HotelsService, useClass: HotelsServiceMock }]
    });

    const fixture = TestBed.createComponent(HotelsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería llamar a getHotels al inicializar', () => {
    const service = TestBed.inject(HotelsService) as unknown as HotelsServiceMock;
    expect(service.getHotels).toHaveBeenCalled();
  });

  it('debería filtrar por nombre', () => {
    component.onNameFilter('azul');
    const result = component.filteredHotels();
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Hotel Azul');
  });

  it('debería filtrar por categoría (stars)', () => {
    component.onCategoriesFilter([5]);
    const result = component.filteredHotels();
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Hotel Rojo');
  });

  it('debería filtrar por rating mínimo', () => {
    component.onRatingFilter(4.7);
    const result = component.filteredHotels();
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Hotel Rojo');
  });

  it('debería filtrar por precio máximo', () => {
    component.onPriceFilter(150);
    const result = component.filteredHotels();
    expect(result.map(h => h.name).sort()).toEqual(['Hotel Medio', 'Pensión Barata'].sort());
  });

  it('debería resetear filtros', () => {
    component.onNameFilter('algo');
    component.onCategoriesFilter([3]);
    component.onRatingFilter(5);
    component.onPriceFilter(10);
    component.onResetFilters();
    expect(component.nameFilter()).toBe('');
    expect(component.categoriesFilter().length).toBe(0);
    expect(component.ratingFilter()).toBe(0);
    expect(component.priceFilter()).toBe(1000);
    expect(component.filteredHotels().length).toBe(MOCK_HOTELS.length);
  });

  it('debería paginar la lista filtrada', () => {
    component.onPriceFilter(150);
    const page = component.pagedHotels();
    expect(page.length).toBe(2);
    expect(page.map(h => h.name).sort()).toEqual(['Hotel Medio', 'Pensión Barata'].sort());
  });

  it('debería volver a página 1 cuando cambia un filtro', () => {
    component.goToPage(2);
    component.onNameFilter('hotel');
    expect(component.currentPage()).toBe(1);
  });
});
