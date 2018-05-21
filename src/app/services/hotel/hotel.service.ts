import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable,  } from 'rxjs';
import { map } from 'rxjs/operators';
import { HotelModel, FilterHotelModel } from '../../Models/HotelModel';


const API_URL = 'https://rif2ibxnjk.execute-api.sa-east-1.amazonaws.com/prod/hotels';

@Injectable()
export class HotelService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAll(filters?: FilterHotelModel): Observable<HotelModel[]> {
    let params;

    if (filters) {
      params = new HttpParams()
      .set('minPrice', filters.minPrice.toString())
      .set('maxPrice', filters.maxPrice.toString())
      .set('stars', filters.stars.toString());
    }

    return this.httpClient.get(API_URL, { params }).pipe(
      map((res: HotelModel) => {
        return res['data'];
      })
    );
  }
}
