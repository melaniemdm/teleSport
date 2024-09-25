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
  private subscription = new Subscription(); // Gestion des abonnements

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.subscription.add(
      combineLatest([
        this.olympicService.getTotalUniqueOlympics(),
        this.olympicService.getTotalCountries(),
        this.olympicService.getAllCountryMedals(),
      ]).subscribe({
        next: ([totalUniqueOlympics, totalCountries, countriesMedals]) => {
          this.totalUniqueOlympics = totalUniqueOlympics;
          this.totalCountries = totalCountries;
          this.countriesMedals = countriesMedals;
        },
        error: (error) => console.error('Error fetching data:', error),
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Désabonnement pour éviter les fuites de mémoire
  }
}
