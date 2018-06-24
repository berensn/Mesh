/*
  Creates a service to retrieve data from json files.
*/

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsonFormat } from './json.format';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JsonService {

  // Constructors
  constructor(private http: HttpClient) { }

  // Methods
  getArticles(_jsonUrl: string): Observable<JsonFormat[]>{
    return this.http.get<JsonFormat[]>(_jsonUrl);      
  }

  getInfocast(_jsonUrl: string): Observable<JsonFormat[]>{
    return this.http.get<JsonFormat[]>(_jsonUrl);
  }
}