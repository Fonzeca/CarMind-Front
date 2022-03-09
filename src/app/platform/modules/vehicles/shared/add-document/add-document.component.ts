import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { AppService } from 'src/app/platform/services/core/app.service';
import { TypeService } from 'src/app/platform/services/type.service';
import { VehiclesService } from 'src/app/platform/services/vehicles.service';
import { BaseComponent } from 'src/app/platform/shared/components/base.component';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css'],
})
export class AddDocumentComponent extends BaseComponent implements OnInit {

  @Input() data:any;

  file: any;
  tipo: any;
  vencimiento: any;

  constructor(public _type: TypeService, private _vehicle:VehiclesService, public _app:AppService, private dialogRef: MatDialog) {
    super();
  }

  ngOnInit(): void {
    this.tipo = this._type.tipo_documento[0];
  }

  readFile(fileEvent: any) {
    this.file = fileEvent.target.files[0];
    console.log('size', this.file.size);
    console.log('type', this.file.type);
  }

  cargar(){
    this._vehicle.uploadDocument(this.data.id, this.tipo, moment(this.vencimiento).format('DD/MM/YYYY'), this.file).subscribe(
      res=>{
        this._app.sw.alertSuccess("Cargado exitoso");
        this.close();
      }
    )
  }

  close(){
    this.dialogRef.closeAll();
  }
}
