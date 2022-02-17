import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalAdjuntarDocumentoComponent } from 'src/app/modal-adjuntar-documento/modal-adjuntar-documento.component';

@Component({
  selector: 'app-detalle-vehicule',
  templateUrl: './detalle-vehicule.component.html',
  styleUrls: ['./detalle-vehicule.component.css']
})
export class DetalleVehiculeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  openDialog() {
    const body = document.querySelector(".body")

   /*  this.renderer2.setStyle(body, 'background-color', 'rgba(0,0,0,0.4)')
    this.renderer2.setStyle(body, 'z.index', '1') */

    this.dialog.open(ModalAdjuntarDocumentoComponent, {
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
