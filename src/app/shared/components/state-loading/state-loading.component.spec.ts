import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateLoadingComponent } from './state-loading.component';

describe('StateLoadingComponent', () => {
  let component: StateLoadingComponent;
  let fixture: ComponentFixture<StateLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateLoadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
