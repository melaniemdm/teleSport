import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
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
  @Input({ required: true }) countriesMedals: CountryMedals[] = [];
 
  chartOption: EChartsOption = {}
  
  constructor(private router: Router) {}


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
            fontSize: 20,
          },
        
        },

      ],
      media: [
        {
          query: { maxWidth: 500 },
          option: {
            series: [{ radius: ['0%', '50%'], label: { fontSize: 12 } }],
            tooltip: { padding: [5, 5], textStyle: { fontSize: 12 } },
          },
        },
        {
          query: { minWidth: 501 },
          option: {
            series: [{ label: { fontSize: 20 } }],
            tooltip: { textStyle: { fontSize: 20 } },
          },
        },
      ],
    };
  }


  /**
   * Event handler for echarts chart events. It logs the event type and data in the console
   * and navigates to the country page when the user clicks on a country in the chart
   * @param event - The echarts event
   * @param type - The type of event
   */
  onChartEvent(event: any, type: string) {
    console.log('chart event:', type, event);
    
    this.router.navigate(['country/' + event.data.id]);
  }

 
  @HostListener('window:resize', ['$event.target.innerWidth'])
  /**
   * Handler for window resize events.
   * This function is called when the window is resized.
   * It reloads the page to apply the new size of the chart.
   * @param width The new width of the window
   */
  onResize(width: number) {
     console.log(width);
     window.location.reload();
  }


  /**
   * Cleanup just before Angular destroys the directive/component. Called just before
   * the directive/component is destroyed.
   * Unsubscribe from observables to prevent memory leaks.
   * @see https://angular.io/api/core/OnDestroy
   */
ngOnDestroy(): void {
  // Désabonnement de l'abonnement pour éviter les fuites de mémoire
  console.log('Composant détruit');
  }
}



