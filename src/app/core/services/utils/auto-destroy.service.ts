import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AutoDestroyService extends Subject<boolean> implements OnDestroy {
  ngOnDestroy(): void {
    this.next(true);
    this.complete();
  }
}
