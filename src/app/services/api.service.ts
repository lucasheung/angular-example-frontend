import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Options, Stock } from '../../types'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private httpClient: HttpClient
  ) { }

  //  PUT request for get resources 
  get<T>(url: string, options: Options): Observable<T> {
    return this.httpClient.get<T>(url, options) as Observable<T>;
  }

  //  Post request for create resource 
  post<T>(url: string, body?: any, options?: Options): Observable<T> {
    return this.httpClient.post<T>(url, body, options);
  }

  //  Put request for modify resources 
  put<T>(url: string, body: Stock, options: Options): Observable<T> {
    return this.httpClient.put<T>(url, body, options) as Observable<T>;
  }

  // Delete request for delete resources 
  delete<T>(url: string, body?: any): Observable<T> {
    return this.httpClient.request<T>('delete', url, { body });
  }
}