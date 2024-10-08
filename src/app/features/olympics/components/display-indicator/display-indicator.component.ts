import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-display-indicator',
  standalone: true,
  imports: [],
  templateUrl: './display-indicator.component.html',
  styleUrl: './display-indicator.component.scss'
})
export class DisplayIndicatorComponent {
  @Input({ required: true }) title: string='';
  @Input({required:true}) valueindicator : string='';
  }
