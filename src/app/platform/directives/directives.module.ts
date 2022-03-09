import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDirective } from './modal.directive';
import { ClickOutsideDirective } from './click-outside.directive';



@NgModule({
  declarations: [ModalDirective, ClickOutsideDirective],
  exports: [ModalDirective, ClickOutsideDirective],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
