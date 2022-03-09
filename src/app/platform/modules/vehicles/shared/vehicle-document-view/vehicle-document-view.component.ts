import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { VehiclesService } from 'src/app/platform/services/vehicles.service';
import { BaseComponent } from 'src/app/platform/shared/components/base.component';

@Component({
  selector: 'app-vehicle-document-view',
  templateUrl: './vehicle-document-view.component.html',
  styleUrls: ['./vehicle-document-view.component.css'],
})
export class VehicleDocumentViewComponent
  extends BaseComponent
  implements OnInit
{
  @Input() data!: any;

  src?: string;
  contentType?: string;

  constructor(private sanitizer: DomSanitizer,public _vehicle: VehiclesService, private dialogRef: MatDialog) {
    super();
  }

  ngOnInit(): void {
    if (this.data.id) {
      this._vehicle
        .getVehicleDocumentById(this.data.id, this.data.tipo)
        .subscribe((data) => {
          this.contentType = data.body.type;
          const blob = new Blob([data.body], { type: this.contentType });
          const url = window.URL.createObjectURL(blob);
          //this.src = this.sanitizer.bypassSecurityTrustResourceUrl(url);
          // this.src = url;
          var anchor = document.createElement('a');
          anchor.href = url;
          anchor.target = '_blank';
          anchor.click();
          this.dialogRef.closeAll();
        });
    }
  }
}
