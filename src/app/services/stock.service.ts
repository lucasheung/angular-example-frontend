import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Options, Stock } from '../../types'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private apiService: ApiService) { }
  getStocks = (url: string): Observable<Stock> => {
    return this.apiService.get(url, {
      responseType: 'json'
    });
  }
  addStock = (url: string, body: any, options: Options): Observable<any> => {
    return this.apiService.post(url, body, options);
  };
  addPosition = (url: string, body: any): Observable<any> => {
    return this.apiService.post(url, body, {});
  };
  editPosition = (url: string, body: any): Observable<any> => {
    return this.apiService.put(url, body, {});
  };
  deletePosition = (url: string, body: any): Observable<any> => {
    return this.apiService.delete(url, body);
  };

  getPosition = (url: string): Observable<Stock> => {
    return this.apiService.get(url, {
      responseType: 'json'
    });
  }
}
