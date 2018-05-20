import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchResultRoutingModule } from './search-result-routing.module';
import { SearchResultComponent } from './search-result.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SearchResultRoutingModule
  ],
  declarations: [
    SearchResultComponent
  ]
})
export class SearchResultModule { }
