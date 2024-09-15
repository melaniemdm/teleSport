import { Component, input } from '@angular/core';

@Component({
  selector: 'app-display-title',
  standalone: true,
  imports: [],
  templateUrl: './display-title.component.html',
  styleUrl: './display-title.component.scss'
})
export class DisplayTitleComponent {
  title = input.required<string>();
}
