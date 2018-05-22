import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { SearchHotelFormService } from '../shared/search-hotel-form/search-hotel-form.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { HotelService } from '../services/hotel/hotel.service';
import { HotelModel, FilterHotelModel } from '../Models/HotelModel';
import { Observable } from 'rxjs';
import { LoaderService } from '../services/loader/loader.service';
import { DatesModel } from '../Models/DatesModel';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchResultComponent implements OnInit {
  toDate: Date;
  fromDate: Date;
  totalNights: number;

  rangeDefault = {
    min: 0,
    max: 200
  };
  filterRange = [0, 0];
  filterStars = [];

  hotels: HotelModel[];

  constructor(
    private searchHotelService: SearchHotelFormService,
    private hotelService: HotelService,
    private loaderService: LoaderService
  ) {
    this.loaderService.showLoader();
    this.searchHotelService.totalNights.subscribe(nights => this.totalNights = nights);
  }

  ngOnInit() {
    this.toDate = this.searchHotelService.toJSDate(this.searchHotelService.toDateSelected);
    this.fromDate = this.searchHotelService.toJSDate(this.searchHotelService.fromDateSelected);

    this.getHotels();
  }

  getHotels(filters?: FilterHotelModel) {
    this.loaderService.showLoader();
    this.hotelService.getAll(filters).subscribe((res: HotelModel[]) => {
      this.hotels = res;
      if (!filters) {
        this.getMinMaxRange();
      }
      setTimeout(() => this.loaderService.showLoader(false), 1500);
    });
  }

  getMinMaxRange() {
    for (const h of this.hotels) {
      this.rangeDefault.max = (h.price > this.rangeDefault.max) ? h.price : this.rangeDefault.max;
    }
    this.filterRange[1] = this.rangeDefault.max;
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
      minPrice: this.filterRange[0] || this.rangeDefault.min,
      maxPrice: this.filterRange[1] || this.rangeDefault.max,
      stars: this.filterStars || [1, 2, 3, 4, 5]
    };
    return filters;
  }

}
