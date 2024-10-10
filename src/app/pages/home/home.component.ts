import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { CountryMedals } from 'src/app/core/models/CountryMedals';
import { Olympics } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public olympics: Olympics[] | null = null;
  public totalUniqueOlympics = 0;
  public totalCountries = 0;
  public countriesMedals: CountryMedals[] = [];
  private readonly subscription = new Subscription(); // Gestion des abonnements

  constructor(private readonly olympicService: OlympicService) { }


  /**
   * OnInit lifecycle hook. Fetches initial data on component initialization.
   *
   * Fetches the total number of unique Olympic years, the total number of countries,
   * and all country medal data. Updates the component fields with the data.
   *
   * @remarks
   * This function is called only once, when the component is initialized.
   * It sets up subscriptions to the observables and updates the component fields
   * with the received data. If an error occurs during data fetching, it is logged
   * to the console.
   */

  ngOnInit(): void {
    this.subscription.add(
      combineLatest([
        this.olympicService.getTotalUniqueOlympics(),
        this.olympicService.getTotalCountries(),
        this.olympicService.getAllCountryMedals(),
      ]).subscribe({

        /**
         * Updates the component fields with the received data.
         *
         * @param totalUniqueOlympics The total number of unique Olympic years.
         * @param totalCountries The total number of countries.
         * @param countriesMedals The array of country medal data.
         */

        next: ([totalUniqueOlympics, totalCountries, countriesMedals]) => {
          this.totalUniqueOlympics = totalUniqueOlympics;
          this.totalCountries = totalCountries;
          this.countriesMedals = countriesMedals;
        },
        error: (error) => console.error('Error fetching data:', error),
      })
    );
     
  }


  /**
   * OnDestroy lifecycle hook. Cancels all subscriptions on component destruction.
   *
   * Called immediately before the component is destroyed. It is mainly used for
   * any custom cleanup that needs to take place when the instance is destroyed.
   * In this case, it unsubscribes all subscriptions to prevent memory leaks.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    console.log('UNSUBSCRIPTION DONE');
    console.log('COMPONENT DESTROYED');
  }
}
