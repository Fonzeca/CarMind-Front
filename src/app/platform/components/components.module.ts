import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalDirective } from '../directives/ad.directive';



@NgModule({
  declarations: [ModalComponent, ModalDirective],
  exports: [ModalComponent, ModalDirective],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents:[ModalComponent]
})
export class ComponentsModule { }
