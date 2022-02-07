import { HomeComponent } from './vehicles/home/home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginModule } from './login/login.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './vehicles/sidebar/sidebar.component';
import { HoverClassDirective } from './hover-class.directive';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    HoverClassDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    HttpClientModule,
  ],


  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
