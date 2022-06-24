import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuardService } from './guards/auth-guard.service';
import { PlatformRoutingModule } from './platform-routing.module';
import { TemplateModule } from './template/template.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PlatformRoutingModule,
    TemplateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[AuthGuardService]
})
export class PlatformModule { }
