import { Component } from '@angular/core';
import { DisplayTitleComponent } from "../../features/olympics/components/display-title/display-title.component";
import { DisplayIndicatorComponent } from "../../features/olympics/components/display-indicator/display-indicator.component";
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Country } from 'src/app/core/models/Country';
import { CommonModule } from '@angular/common';
import { ParticipationMedalsGraphComponent } from "../../features/olympics/components/participation-medals-graph/participation-medals-graph.component";
import { Participation } from 'src/app/core/models/Participation';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-country',
  standalone: true,
  imports: [DisplayTitleComponent, DisplayIndicatorComponent, RouterModule, CommonModule, ParticipationMedalsGraphComponent],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss'
})
export class CountryComponent {
  public countryId: string | null = null;  // stores country id
  public selectedCountry: Country | null = null;
  public participations: Participation[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private olympicService: OlympicService, private router: Router) { }
  ngOnInit(): void {
    //  Get country ID from URL
    this.countryId = this.route.snapshot.paramMap.get('countryId');
   //console.log(this.countryId);

    if (this.countryId) {
      const idExistSubscription =  this.olympicService.isIdExist(this.countryId).subscribe((isExist: boolean) => {
        if (isExist) {
         
          this.router.navigate(['country/'+this.countryId]);
        } else {
          this.router.navigate(['not-found']);
        }
      });
      this.subscriptions.add(idExistSubscription);

      // Use the service to get data for the selected country
     const olympicsSubscription = this.olympicService.getOlympicsForCountry(this.countryId).subscribe((countryData: Country | undefined) => {
        if (countryData) {
          // Assign the complete object to `selectedCountry`
          this.selectedCountry = countryData;
          //console.log(this.selectedCountry);
          this.participations= this.selectedCountry.participations;
        }

      });
      this.subscriptions.add(olympicsSubscription);
    }
  }
  ngOnDestroy(): void {
    // Désabonnement de tous les abonnements pour éviter les fuites de mémoire
    this.subscriptions.unsubscribe();
    console.log('UNSUBSCRIPTION DONE ');
    }
}
