import { Component, OnInit } from '@angular/core';
import { Chart, ChartItem, registerables, ChartConfiguration} from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  /**
  * Instancia de la gráfica
  */
  chart: any;

  /**
  * Datos de la gráfica
  */
  data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];

  getGradient(ctx: any, chartArea: any) {
    let width, height, gradient;
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (!gradient || width !== chartWidth || height !== chartHeight) {
      // Create the gradient because this is either the first render
      // or the size of the chart has changed
      width = chartWidth;
      height = chartHeight;
      gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
      gradient.addColorStop(0, '#a1ffdb');
      gradient.addColorStop(1, '#024d97');
    }

    return gradient;
  }

  public chartConfig: ChartConfiguration = {
    type: 'bar',
    data: {
      labels: this.data.map(row => row.year),
      datasets: [
        {
          label: 'Beneficios por día',
          data: this.data.map(row => row.count),
          backgroundColor: (context: any) => {
            const chart = context.chart;
            const {ctx, chartArea} = chart;

            if (!chartArea) {
              // This case happens on initial chart load
              return;
            }
            return this.getGradient(ctx, chartArea);
          },
        }
      ]
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: (context: any) => {
            const chart = context.chart;
            const {ctx, chartArea} = chart;

            if (!chartArea) {
              // This case happens on initial chart load
              return;
            }
            return this.getGradient(ctx, chartArea);
          },
        }
      },
      scales: {
        y: {
          ticks: {
            color: "white",
          }
        },
        x: {
          ticks: {
            color: "white",
          }
        }
      }
    }
  }

  ngOnInit(): void {
    Chart.register(...registerables);
    this.chart = new Chart('beneficios', this.chartConfig);
  }
}
