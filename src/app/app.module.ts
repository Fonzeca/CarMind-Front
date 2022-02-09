import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VehicleComponent } from './content/vehicle/vehicle.component';
import { LoginModule } from './login/login.module';
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
    ResetSelectionDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
