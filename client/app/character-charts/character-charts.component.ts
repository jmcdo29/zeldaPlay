import { Component, Input, OnInit } from '@angular/core';

import * as Chartist from 'chartist';

import { ChartType, ChartEvent } from 'ng-chartist';
import { Character } from '../Character/character';

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

@Component({
  selector: 'app-character-charts',
  templateUrl: './character-charts.component.html',
  styleUrls: ['./character-charts.component.css']
})
export class CharacterChartsComponent implements OnInit {

  public charts: Chart[];

  @Input() character: Character;

  ngOnInit(): void {
    const health = 100 * this.character.health / this.character.health;
    const magic = 100 * this.character.magic / this.character.magic;
    console.log('Health', health, '\nMagic', magic);
    this.charts = [
      {
        data: {
          labels: ['Health', 'Magic'],
          series: [health, magic]
        },
        type: 'Pie',
        options: {
          donut: true,
          donutWidth: 15,
          startAngle: 270,
          total: 400,
          labelDirection: 'explode',
          showLabel: false
        }
      }
     /*  {
        data: {
          labels: ['Magic'],
          series: [this.character.magic]
        },
        type: 'Pie',
        options: {
          donut: true,
          donutWidth: 15,
          startAngle: 270,
          total: this.character.maxMagic * 2
        }
      } */
    ];
  }

  constructor() {

   }

}
