import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter.pipe';
import { FormsModule } from '@angular/forms';
import { FilterDefectPipe } from './filterDefect.pipe';


@NgModule({
  declarations: [FilterPipe, FilterDefectPipe],
  exports: [FilterPipe, FilterDefectPipe],
  imports: [
    CommonModule,
    FormsModule,
  ],
})
export class SharedModule { }
