import { Component } from '@angular/core';
import { DisplayTitleComponent } from "../../features/olympics/components/display-title/display-title.component";
import { DisplayIndicatorComponent } from "../../features/olympics/components/display-indicator/display-indicator.component";
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Country } from 'src/app/core/models/Country';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-country',
  standalone: true,
  imports: [DisplayTitleComponent, DisplayIndicatorComponent, RouterModule, CommonModule],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss'
})
export class CountryComponent {
  public countryId: string | null = null;  // stores country id
  public selectedCountry: Country | null = null;


  constructor(private route: ActivatedRoute, private olympicService: OlympicService, private router: Router) { }
  ngOnInit(): void {
    //  Get country ID from URL
    this.countryId = this.route.snapshot.paramMap.get('countryId');
    console.log(this.countryId);

    if (this.countryId) {
      this.olympicService.isIdExist(this.countryId).subscribe((isExist: boolean) => {
        if (isExist) {
         
          this.router.navigate(['country/'+this.countryId]);
        } else {
          this.router.navigate(['not-found']);
        }
      })
      // Use the service to get data for the selected country
      this.olympicService.getOlympicsForCountry(this.countryId).subscribe((countryData: Country | undefined) => {
        if (countryData) {
          // Assign the complete object to `selectedCountry`
          this.selectedCountry = countryData;
        }
      });
    }
  }
}
