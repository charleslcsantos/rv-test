import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class SearchHotelFormService {
  private _toDateSelected: NgbDateStruct = null;
  private _fromDateSelected: NgbDateStruct = null;

  constructor() { }

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

  toJSDate(d) {
    if (d) {
      return new Date(d.year, d.month - 1, d.day);
    }
  }

}
