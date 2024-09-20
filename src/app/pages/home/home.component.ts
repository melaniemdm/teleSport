import { Component, OnInit } from '@angular/core';
import {  combineLatest, map} from 'rxjs';
import { CountryMedals } from 'src/app/core/models/CountryMedals';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {
  public olympics: any[] = []; 
  public totalUniqueOlympics: number = 0;
  public totalCountries: number = 0;
  public countriesMedals: CountryMedals[] = []

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    // Use `combineLatest` to manage multiple observables simultaneously
    combineLatest([
      this.olympicService.getTotalUniqueOlympics(),
      this.olympicService.getTotalCountries(),
      this.olympicService.getAllCountryMedals(),
    ])
    .pipe(
      map(([ totalUniqueOlympics, totalCountries, countriesMedals]) => {
        return {  totalUniqueOlympics, totalCountries, countriesMedals }; // Return both results
      })
    )
    .subscribe(({  totalUniqueOlympics, totalCountries, countriesMedals }) => {
      this.countriesMedals = countriesMedals;
      this.totalUniqueOlympics = totalUniqueOlympics;
      this.totalCountries = totalCountries;

      console.log('tableau des countries:', this.countriesMedals)
      console.log('Total unique Olympics:', this.totalUniqueOlympics);
      console.log('Total countries:', this.totalCountries);
    });
    
  }
  
}
