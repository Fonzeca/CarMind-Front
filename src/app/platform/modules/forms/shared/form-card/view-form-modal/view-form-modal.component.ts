import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormsService } from 'src/app/platform/services/forms.service';
import { BaseComponent } from 'src/app/platform/shared/components/base.component';

@Component({
  selector: 'app-view-form-modal',
  templateUrl: './view-form-modal.component.html',
  styleUrls: ['./view-form-modal.component.css']
})
export class ViewFormModalComponent extends BaseComponent implements OnInit {

  @Input() data:any;

  constructor(private dialogRef: MatDialog, public _forms:FormsService) {
    super();
  }

  ngOnInit(): void {
    if(this.data.id){
      this._forms.getHistorialById(this.data.id).subscribe();
    }
  }

}
