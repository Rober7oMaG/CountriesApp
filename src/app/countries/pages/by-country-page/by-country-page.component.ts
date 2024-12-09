import { Component, OnInit } from '@angular/core';

import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit {
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialCountry: string = '';

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    const { term, countries } = this.countriesService.cacheStore.byCountry;

    this.countries = countries;
    this.initialCountry = term;
  }

  searchByCountry(term: string): void {
    this.isLoading = true;

    this.countriesService.searchByCountry(term)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }
}
