import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr-modal',
  templateUrl: './qr-modal.component.html',
  styleUrls: ['./qr-modal.component.css']
})
export class QrModalComponent implements OnInit {

  @Input() data:any;

  constructor() { }

  ngOnInit(): void {
  }

}
