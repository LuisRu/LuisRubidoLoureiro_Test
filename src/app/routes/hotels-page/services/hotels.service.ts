import { HttpClient } from '@angular/common/http';
import { inject,Injectable, signal, WritableSignal} from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { Hotel } from '../../../core/models/hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  $hotels : WritableSignal<Hotel[]> = signal([]);

  private http = inject(HttpClient);  


  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(environment.BASE_API_URL).pipe(
      tap(hs => this.$hotels.set(hs))
    );
  }
  setHotels(hotels:Hotel[]){
    this.$hotels.set(hotels)
  }


}