import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter.pipe';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FilterPipeS } from './filter2.pipe';


@NgModule({
  declarations: [FilterPipe, FilterPipeS],
  exports: [FilterPipe, FilterPipeS],
  imports: [
    CommonModule,
    FormsModule,
  ],
})
export class SharedModule { }
