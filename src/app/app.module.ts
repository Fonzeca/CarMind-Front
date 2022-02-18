import { FormsComponent } from './content/forms/forms.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetalleVehiculeComponent } from './content/detalle-vehicule/detalle-vehicule.component';
import { VehicleComponent } from './content/vehicle/vehicle.component';
import { LoginModule } from './login/login.module';
import { ModalComponent } from './modal/modal.component';
import { HoverClassDirective } from './sidebar/hover-class.directive';
import { ResetSelectionDirective } from './sidebar/reset-selection.directive';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { PerfilComponent } from './content/perfil/perfil.component';
import {MatTableModule} from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonalComponent } from './content/personal/personal.component';
import {MatCardModule} from '@angular/material/card';
import { AsigarFormularioComponent } from './asigar-formulario/asigar-formulario.component';
import { CardSeccionFormComponent } from './card-seccion-form/card-seccion-form.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ModalAdjuntarDocumentoComponent } from './modal-adjuntar-documento/modal-adjuntar-documento.component';
import { DatePipe } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HoverClassDirective,
    VehicleComponent,
    TopbarComponent,
    ResetSelectionDirective,
    ModalComponent,
    DetalleVehiculeComponent,
    PerfilComponent,
    PersonalComponent,
    FormsComponent,
    AsigarFormularioComponent,
    CardSeccionFormComponent,
    ModalAdjuntarDocumentoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatCardModule,
    MatSlideToggleModule,
    FormsModule


  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }
