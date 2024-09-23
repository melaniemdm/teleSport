import { Component, OnInit } from '@angular/core';
import {  combineLatest, map, Subscription} from 'rxjs';
import { CountryMedals } from 'src/app/core/models/CountryMedals';
import { Olympics } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})

export class HomeComponent implements OnInit {
  public olympics: Olympics[] | null = null;
  public totalUniqueOlympics: number = 0;
  public totalCountries: number = 0;
  public countriesMedals: CountryMedals[] = []

  private subscription: Subscription = new Subscription();

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    // Use `combineLatest` to manage multiple observables simultaneously
    const combinedSubscription = combineLatest([
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

      //console.log('tableau des countries:', this.countriesMedals)
     // console.log('Total unique Olympics:', this.totalUniqueOlympics);
     // console.log('Total countries:', this.totalCountries);
    });
    this.subscription.add(combinedSubscription);
  }
  ngOnDestroy(): void {
    // Désabonnement de l'abonnement pour éviter les fuites de mémoire
    this.subscription.unsubscribe();
    console.log('UNSUBSCRIPTION DONE ');
    
  }
}
