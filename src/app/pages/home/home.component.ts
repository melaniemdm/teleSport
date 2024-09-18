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
    // Use `combineLatest` to manage multiple observables simultaneously
    combineLatest([
      this.olympicService.getTotalUniqueOlympics(),
      this.olympicService.getTotalCountries(),
    ])
    .pipe(
      map(([ totalUniqueOlympics, totalCountries]) => {
        return {  totalUniqueOlympics, totalCountries }; // Return both results
      })
    )
    .subscribe(({  totalUniqueOlympics, totalCountries }) => {
  
      this.totalUniqueOlympics = totalUniqueOlympics;
      this.totalCountries = totalCountries;

      console.log('Total unique Olympics:', this.totalUniqueOlympics);
      console.log('Total countries:', this.totalCountries);
    });
  }
}
