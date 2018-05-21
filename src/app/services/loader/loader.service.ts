import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderSource = new Subject<boolean>();
  public loader$ = this.loaderSource.asObservable();
  constructor() { }

  showLoader(arg: boolean = true) {
    this.loaderSource.next(arg);
  }
}
