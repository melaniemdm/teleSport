import { Component, OnInit } from '@angular/core';
import {  combineLatest, map} from 'rxjs';
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

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    // Utiliser `combineLatest` pour gérer plusieurs observables simultanément
    combineLatest([
      this.olympicService.getOlympics(),
      this.olympicService.getTotalUniqueOlympics(),
      this.olympicService.getTotalCountries(),
    ])
    .pipe(
      map(([olympics, totalUniqueOlympics, totalCountries]) => {
        return { olympics, totalUniqueOlympics, totalCountries }; // Retourne les deux résultats
      })
    )
    .subscribe(({ olympics, totalUniqueOlympics, totalCountries }) => {
      this.olympics = olympics;
      this.totalUniqueOlympics = totalUniqueOlympics;
      this.totalCountries = totalCountries;

      console.log('Olympics data:', this.olympics);
      console.log('Total unique Olympics:', this.totalUniqueOlympics);
      console.log('Total countries:', this.totalCountries);
    });
  }
}
