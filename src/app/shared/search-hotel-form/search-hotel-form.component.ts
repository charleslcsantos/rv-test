import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { SearchHotelFormService } from './search-hotel-form.service';
import { Router } from '@angular/router';
import { DatesModel } from '../../Models/DatesModel';

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;


@Component({
  selector: 'app-search-hotel-form',
  templateUrl: './search-hotel-form.component.html',
  styleUrls: ['./search-hotel-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchHotelFormComponent implements OnInit {
  hoveredDate: NgbDateStruct;

  fromDate: NgbDateStruct;
  fromDateFormatted: Date;

  toDate: NgbDateStruct;
  toDateFormatted: Date;

  constructor (
    private router: Router,
    private searchHotelService: SearchHotelFormService
  ) {
  }

  ngOnInit() {
  }

  onDateSelection(date: NgbDateStruct) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.fromDateFormatted  = this.searchHotelService.toJSDate(this.fromDate);

    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
      this.toDateFormatted = this.searchHotelService.toJSDate(this.toDate);

      const dates: DatesModel = {
        fromDate: this.fromDate,
        toDate: this.toDate
      };

      this.searchHotelService.updateDates(dates);

    } else {
      this.toDate = null;
      this.toDateFormatted = null;
      this.fromDate = date;
      this.fromDateFormatted  = this.searchHotelService.toJSDate(this.fromDate);
    }
  }

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);

  search() {
    this.searchHotelService.fromDateSelected = this.fromDate;
    this.searchHotelService.toDateSelected = this.toDate;

    this.router.navigate(['search']);
  }

}
