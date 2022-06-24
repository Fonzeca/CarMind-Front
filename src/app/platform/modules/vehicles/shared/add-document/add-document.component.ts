import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbDateParserFormatter, NgbDateStruct, NgbInputDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from 'src/app/platform/date-parser.service';
import { AppService } from 'src/app/platform/services/core/app.service';
import { TypeService } from 'src/app/platform/services/type.service';
import { VehiclesService } from 'src/app/platform/services/vehicles.service';
import { BaseComponent } from 'src/app/platform/shared/components/base.component';
declare var  $:any
@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css'],
  providers:[{provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}]
})
export class AddDocumentComponent extends BaseComponent implements OnInit {

  @Input() data:any;


  file: any;
  tipo: any;

  tieneVencimiento:boolean = true;

  vencimiento: NgbDateStruct | undefined;

  constructor(public _type: TypeService, private _vehicle:VehiclesService, public _app:AppService, private dialogRef: MatDialog, config: NgbInputDatepickerConfig, private dateParser : NgbDateFRParserFormatter) {
    super();
  }

  ngOnInit(): void {
    this.tipo = this._type.tipo_documento[0];
  }

  ngAfterViewInit() {
  }
  readFile(fileEvent: any) {
    this.file = fileEvent.target.files[0];
  }

  cargar(){
    var momentVencimiento:any;
    if(this.tieneVencimiento && this.vencimiento){
      momentVencimiento = this.dateParser.format(this.vencimiento);
    }else{
      momentVencimiento = "";
    }

    this._vehicle.uploadDocument(this.data.id, this.tipo, momentVencimiento, this.file).subscribe(
      res=>{
        this._app.sw.alertSuccess("Cargado exitoso");
        this.close();
      }
    )
  }
  onCheckboxChange(event : Event){
    this.tieneVencimiento = !this.tieneVencimiento;
  }

  close(){
    this.dialogRef.closeAll();
  }
}