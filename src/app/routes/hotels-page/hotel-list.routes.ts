import { Routes } from '@angular/router';
import { HotelsPageComponent } from './pages/hotel-page/hotels-page.component';

export const HOTEL_LIST_ROUTES: Routes = [
  {
    path: '',
    component: HotelsPageComponent,
  }
];