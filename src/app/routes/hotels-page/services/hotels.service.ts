import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { inject,Injectable, signal, WritableSignal} from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { Hotel, HotelFilters, HotelsResult } from '../../../core/models/hotel';

@Injectable({ providedIn: 'root' })
export class HotelsService {
  private http = inject(HttpClient);
  $hotels: WritableSignal<Hotel[]> = signal([]);


getHotels(query: HotelFilters): Observable<HotelsResult> {
  let params = new HttpParams()
    .set('_page', String(query.page))
    .set('_limit', String(query.limit));

  if (query.name?.trim()) params = params.set('name_like', query.name.trim());
  if (query.minRate != null) params = params.set('rate_gte', String(query.minRate));
  if (query.maxPrice != null) params = params.set('price_lte', String(query.maxPrice));
  if (query.stars?.length) {
    for (const s of query.stars) params = params.append('stars', String(s));
  }

  return this.http
    .get<Hotel[]>(environment.BASE_API_URL, { params, observe: 'response' })
    .pipe(
      map(res => {
        const items = res.body ?? [];
        let total = Number(res.headers.get('X-Total-Count') ?? '0');
        return { items, total };
      }),
      tap(result => this.$hotels.set(result.items))
    );
}


  setHotels(hotels: Hotel[]) {
    this.$hotels.set(hotels);
  }
}