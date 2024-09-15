import { Component, input } from '@angular/core';

@Component({
  selector: 'app-display-indicator',
  standalone: true,
  imports: [],
  templateUrl: './display-indicator.component.html',
  styleUrl: './display-indicator.component.scss'
})
export class DisplayIndicatorComponent {
  title = input.required<string>();
}
