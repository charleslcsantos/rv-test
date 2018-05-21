import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable,  } from 'rxjs';
import { map } from 'rxjs/operators';
import { HotelModel } from '../../Models/HoteModel';


const API_URL = 'https://rif2ibxnjk.execute-api.sa-east-1.amazonaws.com/prod/hotels';

@Injectable()
export class HotelService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAll(): Observable<HotelModel[]> {
    return this.httpClient.get(API_URL).pipe(
      map((res: HotelModel) => {
        return res['data'];
      })
    );
  }
}
