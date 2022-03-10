import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'm-form-card',
  templateUrl: './form-card.component.html',
  styleUrls: ['./form-card.component.scss']
})
export class FormCardComponent implements OnInit {


  @Input() name!:string;

  flicking = false;
  @Input() flicker!:Subject<any>;

  constructor() { }

  ngOnInit(): void {
    this.flicker.subscribe(()=>{
      this.flicking = true;
      setTimeout(() => {
        this.flicking = false;
      }, 200);
    });
  }

}
