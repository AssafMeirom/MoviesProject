import { Directive, OnInit } from '@angular/core';
declare function pieGraph(data): any;
@Directive({
  selector: '[appD3]',
})
export class D3Directive implements OnInit {
  constructor() {}
  data = [
    { label: 'one', value: 20 },
    { label: 'two', value: 50 },
    { label: 'three', value: 20 },
    { label: 'four', value: 10 },
  ];
  ngOnInit() {
    pieGraph(this.data);
  }
}
