import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmitterService {

  private itemClickSource = new Subject<number>();

  itemClick$ = this.itemClickSource.asObservable();

  itemClick(i: number) {
    this.itemClickSource.next(i);
  }
}
