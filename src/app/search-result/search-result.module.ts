import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchResultRoutingModule } from './search-result-routing.module';
import { SearchResultComponent } from './search-result.component';
import { SearchHotelFormService } from '../shared/search-hotel-form/search-hotel-form.service';
import { NouisliderModule, NouisliderComponent } from 'ng2-nouislider';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SearchResultRoutingModule,
    NouisliderModule
  ],
  declarations: [
    SearchResultComponent
  ],
  providers: []
})
export class SearchResultModule { }
