import { DatePipe } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}


@Component({
  selector: 'app-modal-adjuntar-documento',
  templateUrl: './modal-adjuntar-documento.component.html',
  styleUrls: ['./modal-adjuntar-documento.component.css']
})
export class ModalAdjuntarDocumentoComponent implements OnInit {

  public previsualizacion: string = '';
  public archivos: any = [];
  date: Date;



  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public sanitizer: DomSanitizer, public datepipe: DatePipe) {
    this.date=new Date();
    let latest_date =this.datepipe.transform(this.date, 'yyyy-MM-dd');
  }

  extraerBase64 = async ($event: any) =>
  new Promise((resolve, _reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result,
        });
      };
      reader.onerror = (error) => {
        resolve({
          base: null,
        });
      };
    } catch (e) {}
  });

  capturarFile(event: any): any {
    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;
    });
    this.archivos.push(archivoCapturado);
  }

  ngOnInit(): void {

  }

}
