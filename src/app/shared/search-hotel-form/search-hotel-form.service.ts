import { Injectable } from '@angular/core';
import { NgbDateStruct, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatesModel } from '../../Models/DatesModel';

@Injectable({
  providedIn: 'root',
})
export class SearchHotelFormService {
  private datesSource = new Subject<DatesModel>();
  dates$ = this.datesSource.asObservable();

  private _toDateSelected: NgbDateStruct = null;
  private _fromDateSelected: NgbDateStruct = null;
  private _totalNights = 0;

  constructor() {
    //this.dates$.subscribe()
  }

  set toDateSelected(d: NgbDateStruct) {
    this._toDateSelected = d;
  }

  set fromDateSelected(d: NgbDateStruct) {
    this._fromDateSelected = d;
  }

  get toDateSelected(): NgbDateStruct {
    return this._toDateSelected;
  }

  get fromDateSelected(): NgbDateStruct {
    return this._fromDateSelected;
  }

  get totalNights(): Observable<number> {
    return this.dates$.pipe(
      map((dates: DatesModel) => {
        this.fromDateSelected = dates.fromDate;
        this.toDateSelected = dates.toDate;
        return this.calculateNights();
      })
    );
  }

  updateDates(dates?: DatesModel) {
    if (!dates) {
      dates = {
        fromDate: this.toDateSelected,
        toDate: this.fromDateSelected
      };
    }
    this.datesSource.next(dates);
  }

  calculateNights() {
    if (this.fromDateSelected && this.toDateSelected) {
      // this code, I found in stackoverflow
      // https://stackoverflow.com/a/2627493
      const oneDay = 24 * 60 * 60 * 1000;
      const firstDate = this.toJSDate(this.fromDateSelected);
      const secondDate = this.toJSDate(this.toDateSelected);
      const diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));

      return diffDays;
    }
    return 1;
  }

  toJSDate(d) {
    if (d) {
      return new Date(d.year, d.month - 1, d.day);
    }
  }

}
