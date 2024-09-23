import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EChartsOption, ECharts } from 'echarts';
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
  private chartInstance: ECharts | null = null;
 private resizeObserver: ResizeObserver | null = null; // Déclare correctement resizeObserver
  
  constructor(private router: Router) { }


  /**
   * Initialization of the component
   * Set the chart data
   */

  ngOnInit(): void {

    this.chartOption = {
      responsive: true,
      // Configuration de la couleur de la série
      color: ['#793d52', '#89a1db', '#9780a1', '#bfe0f1', '#b8cbe7', '#956065'],
      tooltip: {
        trigger: 'item',
        formatter: '{b} <br/> {c} ',
        backgroundColor: '#04838F',
        borderColor: '#04838F',
        padding: [5, 10],
        textStyle: {
          color: 'white',
          fontSize: 200,
          fontWeight: 'normal',
        }
      },

      calculable: true,
      series: [
        {
          radius: ['0%', '70%'],
          name: 'Médaille par Pays',
          type: 'pie',
          data: this.countriesMedals,
          label: {
            show: true,
            fontSize: 25,
          }
        },
        
      ],
      media: [
        {
          query: {
            maxWidth: 500, // Pour les écrans de moins de 500px de large (smartphones)
          },
          option: {
            series: [
              {
                radius: ['0%', '50%'],
                label: {
                  fontSize: 12, // Réduction de la taille des labels sur mobile
                },
              },
            ],
            tooltip: {
              padding: [5, 5],
              textStyle: {
                fontSize: 12, // Réduire la taille du texte de l'info-bulle sur mobile
              },
            },
          },
        },
        {
          query: {
            minWidth: 501, // Pour les écrans plus grands (tablettes, desktop)
          },
          option: {
            series: [
              {
                label: {
                  fontSize: 20, // Ajustement de la taille des labels pour des écrans plus grands
                },
              },
            ],
            tooltip: {
              textStyle: {
                fontSize: 20, // Taille de l'info-bulle ajustée pour écrans moyens
              },
            },
          },
        },
      ]
    };

  }
 onChartEvent(event: any, type: string) {
    this.router.navigate(['country/' + event.data.id]);
  }
  }




