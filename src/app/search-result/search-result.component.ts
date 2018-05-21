import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SearchHotelFormService } from '../shared/search-hotel-form/search-hotel-form.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { HotelService } from '../services/hotel/hotel.service';
import { HotelModel } from '../Models/HoteModel';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {
  toDate: Date;
  fromDate: Date;
  totalNights: Observable<number>;
  filterRange = [0, 1000];

  hotels: HotelModel[];

  constructor(
    private searchHotelService: SearchHotelFormService,
    private hotelService: HotelService
  ) { }

  ngOnInit() {
    this.toDate = this.searchHotelService.toJSDate(this.searchHotelService.toDateSelected);
    this.fromDate = this.searchHotelService.toJSDate(this.searchHotelService.fromDateSelected);
    this.totalNights = this.searchHotelService.totalNights;

    this.getHotels();
  }

  getHotels() {
    this.hotelService.getAll().subscribe((res: HotelModel[]) => {
      this.hotels = res;
      console.log(res[0]);
    });
  }

  onFilterStarsChange(e) {
    console.log(e);
  }

}
