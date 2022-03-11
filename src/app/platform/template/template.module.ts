import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { TemplateContainerComponent } from './container/container.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [SidebarComponent, TopbarComponent, TemplateContainerComponent],
  exports: [TemplateContainerComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ComponentsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class TemplateModule { }
