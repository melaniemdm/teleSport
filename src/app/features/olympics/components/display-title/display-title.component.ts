import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-display-title',
  standalone: true,
  imports: [],
  templateUrl: './display-title.component.html',
  styleUrl: './display-title.component.scss'
})
export class DisplayTitleComponent {
@Input({ required: true }) title: string='';
}
