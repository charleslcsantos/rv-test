import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SearchResultRoutingModule } from './search-result-routing.module';
import { SearchResultComponent } from './search-result.component';
import { SearchHotelFormService } from '../shared/search-hotel-form/search-hotel-form.service';
import { NouisliderModule, NouisliderComponent } from 'ng2-nouislider';
import { HotelService } from '../services/hotel/hotel.service';
import { AppModule } from '../app.module';
import { StarsComponent } from '../shared/stars/stars.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SearchResultRoutingModule,
    NouisliderModule,
  ],
  declarations: [
    SearchResultComponent,
    StarsComponent
  ],
  providers: [
    HotelService,
  ]
})
export class SearchResultModule { }
