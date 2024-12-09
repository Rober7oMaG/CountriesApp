import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, map, Observable, of, tap } from 'rxjs';

import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {
  private baseApiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byRegion: { countries: [] },
    byCountry: { term: '', countries: [] },
  };

  constructor(private httpClient: HttpClient) {}

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(() => of([])),
      );
  }
  
  searchByCapital(capital: string): Observable<Country[]> {
    const url = `${this.baseApiUrl}/capital/${capital}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCapital = { term: capital, countries }),
      );
  }

  searchByRegion(region: Region): Observable<Country[]> {
    const url = `${this.baseApiUrl}/region/${region}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byRegion = { region, countries }),
      );
  }

  searchByCountry(name: string): Observable<Country[]> {
    const url = `${this.baseApiUrl}/name/${name}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCountry = { term: name, countries }),
      );
  }
  
  searchByAlphaCode(alphaCode: string): Observable<Country | null> {
    const url = `${this.baseApiUrl}/alpha/${alphaCode}`;
    return this.httpClient.get<Country[]>(url)
    .pipe(
      map(countries => countries.length ? countries[0] : null),
      catchError(() => of(null))
    );
  }
}