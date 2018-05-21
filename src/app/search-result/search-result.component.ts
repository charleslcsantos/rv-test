import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SearchHotelFormService } from '../shared/search-hotel-form/search-hotel-form.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { HotelService } from '../services/hotel/hotel.service';
import { HotelModel, FilterHotelModel } from '../Models/HotelModel';
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

  range = {
    min: 0,
    max: 200
  };
  filterRange = [0, 200];
  filterStars = [];

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

  getHotels(filters?: FilterHotelModel) {
    this.hotelService.getAll(filters).subscribe((res: HotelModel[]) => {
      this.hotels = res;
      if (!filters) {
        this.getMinMaxRange();
      }
    });
  }

  getMinMaxRange() {
    for (const h of this.hotels) {
      this.range.max = (h.price > this.range.max) ? h.price : this.range.max;
    }
    this.filterRange[1] = this.range.max;
  }

  onFilterRangeChange(event) {
    this.filterRange = event;
    this.getHotels(this.getFilters());
  }

  onFilterStarsChange(e) {
    if (this.filterStars.indexOf(e) === -1) {
      this.filterStars.push(e);
    } else {
      this.filterStars.splice(this.filterStars.indexOf(e), 1);
    }

    this.getHotels(this.getFilters());
  }

  getFilters(): FilterHotelModel {
    const filters: FilterHotelModel = {
      minPrice: this.filterRange[0] || this.range.min,
      maxPrice: this.filterRange[1] || this.range.max,
      stars: this.filterStars || [1, 2, 3, 4, 5]
    };
    return filters;
  }

}
