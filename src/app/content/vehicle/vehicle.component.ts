import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/modal/modal.component';



@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  constructor(public dialog: MatDialog, private renderer2: Renderer2) {}

  openDialog() {
    const body = document.querySelector(".body")

   /*  this.renderer2.setStyle(body, 'background-color', 'rgba(0,0,0,0.4)')
    this.renderer2.setStyle(body, 'z.index', '1') */

    this.dialog.open(ModalComponent, {
      width: '635px;',
      height: '477px',
      panelClass: ['md:w-3/5', 'w-full'],
      maxHeight: '85vh',
       data: {
         animal: 'panda',
       },
     });

  }

   formatList(){
     const list = document.querySelector(".")
   }





  ngOnInit(): void {
  }

}
