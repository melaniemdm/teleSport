import { Component } from '@angular/core';
import { DisplayTitleComponent } from "../../features/olympics/components/display-title/display-title.component";
import { DisplayIndicatorComponent } from "../../features/olympics/components/display-indicator/display-indicator.component";

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [DisplayTitleComponent, DisplayIndicatorComponent],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss'
})
export class CountryComponent {

}
