import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, Observable, of } from 'rxjs';

import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {
  private baseApiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private httpClient: HttpClient) {}
  
  searchByCapital(capital: string): Observable<Country[]> {
    const url = `${this.baseApiUrl}/capital/${capital}`;
    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(() => of([]))
      );
  }

  searchByRegion(region: string): Observable<Country[]> {
    const url = `${this.baseApiUrl}/region/${region}`;
    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(() => of([]))
      );
  }

  searchByCountry(name: string): Observable<Country[]> {
    const url = `${this.baseApiUrl}/name/${name}`;
    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(() => of([]))
      );
  }
}