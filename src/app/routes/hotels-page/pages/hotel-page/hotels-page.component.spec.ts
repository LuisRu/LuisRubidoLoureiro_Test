import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { HotelsPageComponent } from './hotels-page.component';
import { HotelsService } from '../../services/hotels.service';

describe('HotelsPageComponent (mínimo)', () => {
  let component: HotelsPageComponent;

  const hsStub = {
    currentPage: () => 1,
    nameFilter: () => '',
    starsFilter: () => [] as number[],
    ratingFilter: () => 0,
    priceFilter: () => Number.POSITIVE_INFINITY,
    totalPages: () => 5,
    setPage: jasmine.createSpy('setPage'),
    setName: jasmine.createSpy('setName'),
    setStars: jasmine.createSpy('setStars'),
    setRating: jasmine.createSpy('setRating'),
    setPrice: jasmine.createSpy('setPrice'),
  } as unknown as HotelsService;

  const qp$ = new BehaviorSubject(convertToParamMap({
    page: '2',
    name: 'Hil',
    stars: ['3', '4'] as any,
    rating: '4',
    price: '200'
  }));

  const navigateSpy = jasmine.createSpy('navigate');

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HotelsPageComponent],
      providers: [
        { provide: HotelsService, useValue: hsStub },
        { provide: ActivatedRoute, useValue: { queryParamMap: qp$.asObservable(), snapshot: { queryParamMap: qp$.value } } },
        { provide: Router, useValue: { navigate: navigateSpy } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    const fixture = TestBed.createComponent(HotelsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('sincroniza query params iniciales con el servicio', () => {
    expect(hsStub.setPage).toHaveBeenCalledWith(2);
    expect(hsStub.setName).toHaveBeenCalledWith('Hil');
    expect(hsStub.setStars).toHaveBeenCalledWith([3, 4]);
    expect(hsStub.setRating).toHaveBeenCalledWith(4);
    expect(hsStub.setPrice).toHaveBeenCalledWith(200);
  });

  it('goToPage navega cuando la página es válida', () => {
    component.goToPage(3);
    expect(navigateSpy).toHaveBeenCalled();
    const [, opts] = navigateSpy.calls.mostRecent().args;
    expect(opts.queryParams.page).toBe(3);
    expect(opts.replaceUrl).toBeFalse();
  });
});
