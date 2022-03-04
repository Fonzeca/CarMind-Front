import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformRoutingModule } from './platform-routing.module';
import { TemplateModule } from './template/template.module';
import { AuthGuardService } from './guards/auth-guard.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PlatformRoutingModule,
    TemplateModule,
    FormsModule
  ],
  providers:[AuthGuardService]
})
export class PlatformModule { }
