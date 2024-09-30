import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EChartsOption, ECElementEvent } from 'echarts';
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

  constructor(private router: Router) { }

  /**
   * This function is called once when the component is initialized.
   * It sets the option object for the echarts chart with a pie chart.
   * The chart is configured to display the total number of medals for each country.
   * The chart is also made responsive to different screen sizes.
   */
  ngOnInit(): void {
    this.chartOption = {

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
          data: this.countriesMedals.map((countryMedals: CountryMedals) => ({
            name: countryMedals.name,
            value: countryMedals.value,
            id: countryMedals.id,
          })),
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
   * Handler for echarts events.
   * @param event The echarts event.
   * @param type The type of event that occurred.
   */
  onChartEvent(event: ECElementEvent, type: string): void {
    console.log('chart event:', type, event);

    if (event.data && typeof event.data === 'object' && 'id' in event.data) {
      const data = event.data as { id: string };
      this.router.navigate(['country/' + data.id]);
    } else {
      console.warn("L'événement ne contient pas d'ID valide", event);
    }
  }


  @HostListener('window:resize', ['$event.target.innerWidth'])


  /**
   * Handles window resize event.
   * @param width The new width of the window in pixels.
   */

  onResize(width: number): void {
    console.log('New width:', width);
  }




  /**
   * Called when the component is destroyed.
   * This lifecycle hook is called right before the directive, pipe or service instance is destroyed.
   * It is mainly used for any custom cleanup that needs to take place when the instance is destroyed.
   */
  ngOnDestroy(): void {

    console.log('Composant détruit');
  }
}



