import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-stars',
  template: `<img class="star"
            *ngFor="let star of _qtd; index as i"
            [src]="isFilled(i)"
            alt="{{ alt }}">`,
  styles: [`
            .star {
              width: 30px;
              margin-left: 5px;
              margin-bottom: 15px;
            }
  `],
  encapsulation: ViewEncapsulation.None,
})
export class StarsComponent implements OnInit {
  @Input() qtd: number;
  @Input() alt: string;
  @Input() qtdFilled: number;
  url: string;
  _qtd: Array<number>;

  constructor() {
  }

  ngOnInit() {
    this._qtd =  new Array(this.qtd).fill(0);
  }

  isFilled = i => (i < this.qtdFilled) ? 'assets/images/star-filled.svg' : 'assets/images/star-outline.svg';

}
