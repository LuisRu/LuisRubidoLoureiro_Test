import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/main-layout/main-layout.component';


export const routes: Routes = [
    {
        path:'',
        component:MainLayoutComponent,
        children : [
            {
                path:'',
                loadChildren: () => 
                    import('./routes/hotels-page/hotel-list.routes').then(
                        (r) => r.HOTEL_LIST_ROUTES 
                    )
            }
        ]
    },
    {
        path: '**',
        redirectTo : '',
    }
];
