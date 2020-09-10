import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from '@env';

import { toFormData } from '@core/utils/to-form-data';


@Injectable()
export class ApiService {
  private readonly params: HttpParams = new HttpParams();
  private readonly headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    });

  constructor(private http: HttpClient) {
  }

  get<T>(
    url: string,
    params: HttpParams = this.params,
    headers: HttpHeaders = this.headers
  ): Observable<T> {
    return this.http.get<T>(`${env.apiUrl}${url}`, { params, headers });
  }

  post<T>(
    url: string,
    body: object = {},
    params: HttpParams = this.params,
    headers: HttpHeaders = this.headers
  ): Observable<T> {
    return this.http.post<T>(`${env.apiUrl}${url}`, JSON.stringify(body), { params, headers });
  }

  put<T>(
    url: string,
    body: object = {},
    params: HttpParams = this.params,
    headers: HttpHeaders = this.headers
  ): Observable<T> {
    return this.http.put<T>(`${env.apiUrl}${url}`, JSON.stringify(body), { params, headers });
  }

  putFormData<T>(
    url: string,
    body: object = {},
    params: HttpParams = this.params,
    headers?: HttpHeaders
  ): Observable<T> {
    return this.http.put<T>(`${env.apiUrl}${url}`, toFormData(body), { params, headers });
  }

  delete<T>(
    url: string,
    params: HttpParams = this.params,
    headers: HttpHeaders = this.headers
  ): Observable<T> {
    return this.http.delete<T>(`${env.apiUrl}${url}`, { params, headers });
  }
}
