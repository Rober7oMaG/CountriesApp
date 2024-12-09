import { Component, OnInit } from '@angular/core';

import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit {
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialCapital: string = '';

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    const { term, countries } = this.countriesService.cacheStore.byCapital;

    this.countries = countries;
    this.initialCapital = term;
  }

  searchByCapital(term: string): void {
    this.isLoading = true;

    this.countriesService.searchByCapital(term)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }
}
