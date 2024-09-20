import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EChartsOption } from 'echarts';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { CountryMedals } from 'src/app/core/models/CountryMedals';


@Component({
  selector: 'app-all-medals-graph',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './all-medals-graph.component.html',
  styleUrl: './all-medals-graph.component.scss',
  providers: [
    provideEcharts(),
  ]
})
export class AllMedalsGraphComponent {
  chartOption: EChartsOption = {}
  @Input({ required: true }) countriesMedals: CountryMedals[] = [];
  onChartEvent(event: any, type: string) {
    console.log('chart event:', type, event.data.id);
    this.router.navigate(['country/'+event.data.id]);
  }
  constructor(private router: Router) { }


  /**
   * Initialization of the component
   * Set the chart data
   */

  ngOnInit(): void {

    this.chartOption = {
      
      tooltip: {
        trigger: 'item',
        formatter: '{b} <br/> {c} ',
      },
      calculable: true,
      series: [
        {
          name: 'Médaille par Pays',
          type: 'pie',
          data: this.countriesMedals,
        },
      ],
    };

  }
 
}



