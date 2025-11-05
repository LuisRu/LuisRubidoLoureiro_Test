import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HotelsCardComponent } from './hotels-card.component';
import { Hotel } from '../../core/models/hotel'; // ajusta la ruta si cambia

describe('HotelsCardComponent', () => {
  let component: HotelsCardComponent;
  let fixture: ComponentFixture<HotelsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelsCardComponent] // standalone
    }).compileComponents();

    fixture = TestBed.createComponent(HotelsCardComponent);
    component = fixture.componentInstance;

    const mockHotel: Hotel = {
      id: '1',
      name: 'Test Hotel',
      image: 'https://via.placeholder.com/240x180',
      address: 'Calle 123',
      stars: 3,
      rate: 4.5,
      price: 120
    };

    component.hotel = mockHotel;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render hotel name in template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test Hotel');
  });
});
