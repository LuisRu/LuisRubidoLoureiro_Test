import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateErrorComponent } from './state-error.component';

describe('StateErrorComponent', () => {
  let component: StateErrorComponent;
  let fixture: ComponentFixture<StateErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
