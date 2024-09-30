import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { Participation } from 'src/app/core/models/Participation';
@Component({
  selector: 'app-participation-medals-graph',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './participation-medals-graph.component.html',
  styleUrl: './participation-medals-graph.component.scss',
  providers: [
    provideEcharts(),
  ]
})

export class ParticipationMedalsGraphComponent {
  chartOption: EChartsOption = {}
  @Input({ required: true }) participations: Participation[] = [];



  /**
   * Initialization of the component.
   * When the component is initialized, it builds the chart configuration
   * from the participations data provided as input.
   * It verifies that the data is not empty to avoid errors.
   */

  ngOnInit(): void {
    if (this.participations.length) {
      this.chartOption = {
        xAxis: {
          type: 'category',
          data: this.participations.map((participation: Participation) => participation.year),
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: this.participations.map((participation: Participation) => participation.medalsCount),
            type: 'line',
          },
        ],
      };
    }
  }

}
