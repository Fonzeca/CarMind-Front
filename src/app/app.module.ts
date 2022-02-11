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

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HoverClassDirective,
    VehicleComponent,
    TopbarComponent,
    ResetSelectionDirective,
    ModalComponent,
    DetalleVehiculeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }
