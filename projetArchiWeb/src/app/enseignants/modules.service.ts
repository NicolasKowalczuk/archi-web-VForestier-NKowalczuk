import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError, Subject } from "rxjs";
import { catchError, map } from 'rxjs/operators';

import { Module } from "./model/module.model";

//Distribue au niveau de root
@Injectable({providedIn: 'root'})
export class ModulesService {

  endpoint: string = 'http://localhost:8000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient){}

    // Get all modules
    GetModules() {
      return this.http.get(`${this.endpoint}/modules`);
    }

    GetModule(id: any): Observable<any> {
      let API_URL = `${this.endpoint}/read-module/${id}`;
      return this.http.get(API_URL, { headers: this.headers }).pipe(
        map((res) => {
          return res || {};
        }),
        catchError(this.errorMgmt)
      );
    }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
