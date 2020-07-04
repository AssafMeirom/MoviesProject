import { Directive, OnInit, Input } from '@angular/core';

declare function barChart(data);
@Directive({
  selector: '[appD3]',
})
export class D3Directive implements OnInit {
  @Input() horrorCounter: number = 0;
  @Input() comedyCounter: number = 0;
  @Input() dramaCounter: number = 0;
  @Input() actionCounter: number = 0;
  @Input() adventureCounter: number = 0;
  @Input() thrillerCounter: number = 0;
  @Input() romanceCounter: number = 0;
  @Input() mysteryCounter: number = 0;
  constructor() {}

  ngOnInit() {
    let data = [
      {
        name: 'Horror',
        Value: this.horrorCounter.toString(),
      },
      {
        name: 'Comedy',
        Value: this.comedyCounter.toString(),
      },
      {
        name: 'Drama',
        Value: this.dramaCounter.toString(),
      },
      {
        name: 'Action',
        Value: this.actionCounter.toString(),
      },
      {
        name: 'Adventure',
        Value: this.adventureCounter.toString(),
      },
      {
        name: 'Thriller',
        Value: this.thrillerCounter.toString(),
      },
      {
        name: 'Romance',
        Value: this.romanceCounter.toString(),
      },
      {
        name: 'Mystery',
        Value: this.mysteryCounter.toString(),
      },
    ];
    barChart(data);
  }
}
