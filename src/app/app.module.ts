import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './shared/menu/menu.component';
import { SearchHotelFormComponent } from './shared/search-hotel-form/search-hotel-form.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SearchHotelFormService } from './shared/search-hotel-form/search-hotel-form.service';
import { LoaderComponent } from './shared/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SearchHotelFormComponent,
    FooterComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    NgbModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    SearchHotelFormService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
