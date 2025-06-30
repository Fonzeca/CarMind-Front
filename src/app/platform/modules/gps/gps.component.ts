import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';


import { GpsService } from 'src/app/platform/services/gps.service';
import { BaseComponent } from 'src/app/platform/shared/components/base.component';



@Component({
  selector: 'app-gps',
  templateUrl: './gps.component.html',
  styleUrls: ['./gps.component.scss']
})
export class GpsComponent extends BaseComponent implements OnInit {

  vehicleViewSelected: boolean = true;

  changeToVehicles: any;

  constructor(public router: Router, public gps_service: GpsService) {
    super();



    if (!this.router.url.includes('vehicles/details')) {
      if (this.router.url.includes('zones')) this.vehicleViewSelected = false;

      this.changeRoute(this.vehicleViewSelected);
    }


    //Cuando se está en la pestaña de rastreador, y se clickea nuevamente en rastreador, no se llama al cosntructor por lo que no se va ni a la zone-list
    // ni a los vehicle-list Y queda la pantalla vacía, con este obserber, cuando se detecta esta ruta se redirige a la vehicle-list
    this.changeToVehicles = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === "/platform/gps") {
          this.changeRoute(true);
        }
      }
    });
  }

  ngOnInit(): void {
  }



  override ngOnDestroy(): void {
    this.changeToVehicles.unsubscribe();
  }

  changeRoute(isVehiclePressed: boolean) {
    this.vehicleViewSelected = isVehiclePressed;
    if (this.vehicleViewSelected) {
      this.router.navigate([this.getAppRoutes.platform.gps.vehicles.route]);
    } else {
      this.router.navigate([this.getAppRoutes.platform.gps.zones.route]);
    }
  }

  isNotInDetails() {
    return !this.router.url.includes('details');
  }

  toggleMap() {
    const mapContainer = document.getElementById('map-container-content');
    const flechaClose = document.getElementById('flecha_close');

    // If the mapContainer is not found, do nothing
    if (!mapContainer || !flechaClose) {
      return;
    }

    // Toggle the class 'close' on the mapContainer
    mapContainer.classList.toggle('close'); 

    //Togle the icon of the flecha_close
    if (mapContainer.classList.contains('close')) {
      flechaClose.innerHTML = '<i class="pi pi-chevron-right" style="font-size: 24px;"></i>';
    } else {
      flechaClose.innerHTML = '<i class="pi pi-chevron-left" style="font-size: 24px;"></i>';
    }
  }

}
