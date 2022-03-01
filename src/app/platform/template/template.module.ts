import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { TemplateContainerComponent } from './container/container.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [SidebarComponent, TopbarComponent, TemplateContainerComponent],
  exports: [TemplateContainerComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class TemplateModule { }
