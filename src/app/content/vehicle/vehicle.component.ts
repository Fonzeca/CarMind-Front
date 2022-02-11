import { Component, OnInit, Renderer2 } from '@angular/core';



@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  constructor(private renderer2: Renderer2) {}

  openDialog() {
    const body = document.querySelector(".body")

   /*  this.renderer2.setStyle(body, 'background-color', 'rgba(0,0,0,0.4)')
    this.renderer2.setStyle(body, 'z.index', '1') */

  }

   formatList(){
     const list = document.querySelector(".")
   }





  ngOnInit(): void {
  }

}
