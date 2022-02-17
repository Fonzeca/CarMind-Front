import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}


@Component({
  selector: 'app-modal-adjuntar-documento',
  templateUrl: './modal-adjuntar-documento.component.html',
  styleUrls: ['./modal-adjuntar-documento.component.css']
})
export class ModalAdjuntarDocumentoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

}
