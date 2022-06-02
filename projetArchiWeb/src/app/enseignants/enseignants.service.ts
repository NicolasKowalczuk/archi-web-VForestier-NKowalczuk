import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError, Subject } from "rxjs";
import { catchError, map } from 'rxjs/operators';

import { Enseignant } from "./enseignant.model";

//Distribue au niveau de root
@Injectable({providedIn: 'root'})
export class EnseignantsService {
  // private enseignants: Enseignant[] = [];
  // private enseignantsUpdated = new Subject<Enseignant[]>();

  // getEnseignants(){
  //   //Permet de récupérer les enseignants en copiant le tableau plutôt que de rester par référence
  //   return [...this.enseignants];
  // }

  // getEnseignantUpdateListener(){
  //   return this.enseignantsUpdated.asObservable();
  // }

  // addEnseignant(nom: String, prenom: String, statut: String, UC: Number){
  //   const enseignant: Enseignant =
  //   { nom: nom, prenom: prenom, statut: statut, UC: UC }

  //   this.enseignants.push(enseignant);
  //   this.enseignantsUpdated.next([...this.enseignants]);
  // }

  endpoint: string = 'http://localhost:8000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient){}
    //Add enseignant
    AddEnseignant(data: Enseignant): Observable<any> {
      let API_URL = `${this.endpoint}/add-enseignant`;
      return this.http.post(API_URL, data).pipe(catchError(this.errorMgmt));
    }

    // Get all enseignants
    GetEnseignants() {
      return this.http.get(`${this.endpoint}`);
    }

    GetEnseignant(id: any): Observable<any> {
      let API_URL = `${this.endpoint}/read-enseignant/${id}`;
      return this.http.get(API_URL, { headers: this.headers }).pipe(
        map((res) => {
          return res || {};
        }),
        catchError(this.errorMgmt)
      );
    }

  // Update enseignant
  UpdateEnseignant(id: any, data: any): Observable<any> {
    let API_URL = `${this.endpoint}/update-enseignant/${id}`;
    return this.http
      .post(API_URL, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  DeleteEnseignant(id: any): Observable<any> {
    var API_URL = `${this.endpoint}/delete-enseignant/${id}`;
    return this.http.delete(API_URL).pipe(catchError(this.errorMgmt));
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
