import { Component } from '@angular/core';
import { DisplayTitleComponent } from "../../features/olympics/components/display-title/display-title.component";
import { DisplayIndicatorComponent } from "../../features/olympics/components/display-indicator/display-indicator.component";
import { ActivatedRoute } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Country } from 'src/app/core/models/Country';



@Component({
  selector: 'app-country',
  standalone: true,
  imports: [DisplayTitleComponent, DisplayIndicatorComponent],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss'
})
export class CountryComponent {
  public countryId: string | null = null;  // stores country id
  public selectedCountry: Country | null = null;


  constructor(private route: ActivatedRoute, private olympicService: OlympicService) { }
  ngOnInit(): void {
    //  Get country ID from URL
    this.countryId = this.route.snapshot.paramMap.get('countryId');
    console.log(this.countryId);

    if (this.countryId) {
      // Utiliser le service pour obtenir les données du pays sélectionné
      // console.log(this.olympicService.getOlympicsForCountry(this.countryId).subscribe((countryData: Country | undefined)=>{console.log(countryData)}));
      // console.log(this.olympicService.getOlympicsForCountry(this.countryId));
      this.olympicService.getOlympicsForCountry(this.countryId).subscribe((countryData: Country | undefined) => {
        if (countryData) {
          // Assigner l'objet complet à `selectedCountry`
          this.selectedCountry = countryData;
        }
      });
    }
  }
}
