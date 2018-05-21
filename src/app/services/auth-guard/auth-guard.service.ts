import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SearchHotelFormService } from '../../shared/search-hotel-form/search-hotel-form.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private searchHotelService: SearchHotelFormService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.searchHotelService.fromDateSelected &&
        this.searchHotelService.toDateSelected) {
      return true;
    }
    return false;
  }

}
