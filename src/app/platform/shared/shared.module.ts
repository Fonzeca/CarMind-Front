import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter.pipe';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [FilterPipe],
  exports: [FilterPipe],
  imports: [
    CommonModule,
    FormsModule,
  ],
})
export class SharedModule { }
