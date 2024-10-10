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
  public countryId: string | null = null;
  public selectedCountry: Country | null = null;
  public participations: Participation[] = [];
  private readonly subscriptions: Subscription = new Subscription();

  constructor(private readonly route: ActivatedRoute, private readonly olympicService: OlympicService, private readonly router: Router) { }

  /**
   * OnInit lifecycle hook. Called once when the component is initialized.
   * This component will try to get the country ID from the URL.
   * If the country ID is found, it will check if the ID exists in the data.
   * If the ID does not exist, it will navigate to the not-found page.
   * If the ID does exist, it will get the data for the selected country
   * and assign the complete object to `selectedCountry`.
   * It will also extract the participations of the country and assign
   * them to `participations`.
   */

  ngOnInit(): void {
    //  Get country ID from URL
    this.countryId = this.route.snapshot.paramMap.get('countryId');
    if (this.countryId) {
      const idExistSubscription = this.olympicService.isIdExist(this.countryId).subscribe((isExist: boolean) => {
        if (!isExist) {
          this.router.navigate(['not-found']);
        }
      });
      this.subscriptions.add(idExistSubscription);
      const olympicsSubscription = this.olympicService.getOlympicsForCountry(this.countryId).subscribe((countryData: Country | undefined) => {
        if (countryData) {
          this.selectedCountry = countryData;
          this.participations = this.selectedCountry.participations;
        }
      });
      this.subscriptions.add(olympicsSubscription);
    }
  }

  /**
   * Called when the component is destroyed.
   * This lifecycle hook is called right before the directive, pipe or service instance is destroyed.
   * It is mainly used for any custom cleanup that needs to take place when the instance is destroyed.
   * In this case, it is used to unsubscribe all subscriptions to prevent memory leaks.
   */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    console.log('UNSUBSCRIPTION DONE');
    console.log('COMPONENT DESTROYED');
  }
}
