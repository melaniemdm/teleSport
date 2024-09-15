import { Component } from '@angular/core';
import { DisplayTitleComponent } from "../../features/olympics/components/display-title/display-title.component";
import { DisplayIndicatorComponent } from "../../features/olympics/components/display-indicator/display-indicator.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [DisplayTitleComponent, DisplayIndicatorComponent],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss'
})
export class CountryComponent {
  public countryId: string | null = null;  // stores country id

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    //  Get country ID from URL
    this.countryId = this.route.snapshot.paramMap.get('countryId');
    console.log(this.countryId);
    
  }

}
// get CountryId from route
