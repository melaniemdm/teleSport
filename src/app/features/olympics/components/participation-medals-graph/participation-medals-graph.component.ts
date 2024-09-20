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
  ngOnInit (): void{
    console.log(this.participations.map(participation=> participation.year));
    console.log(this.participations.map(particpation=>particpation.medalsCount));
    this.chartOption= {
      xAxis: {
        type: 'category',
        data: this.participations.map(participation=> participation.year),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: this.participations.map(particpation=>particpation.medalsCount),
          type: 'line',
        },
      ],
    };
  }

}
