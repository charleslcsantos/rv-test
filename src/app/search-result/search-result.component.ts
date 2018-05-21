import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SearchHotelFormService } from '../shared/search-hotel-form/search-hotel-form.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  toDate: Date;
  fromDate: Date;
  filterRange = [0, 1000];

  constructor(
    private searchHotelService: SearchHotelFormService
  ) { }

  ngOnInit() {
    this.toDate = this.searchHotelService.toJSDate(this.searchHotelService.toDateSelected);
    this.fromDate = this.searchHotelService.toJSDate(this.searchHotelService.fromDateSelected);
  }

  onPriceRangeChange(e) {
    console.log(e);
  }

}
