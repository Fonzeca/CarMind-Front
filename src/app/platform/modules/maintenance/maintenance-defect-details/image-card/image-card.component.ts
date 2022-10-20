import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss']
})
export class ImageCardComponent implements OnInit {

  @Input() image:any;

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
