import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Easing, Tween, update } from '@tweenjs/tween.js';
import { Subscription, firstValueFrom, tap, timer } from 'rxjs';
import { VehicleState, VehiclesImeisRequest } from 'src/app/platform/interfaces/gps_data';
import { vehicle } from 'src/app/platform/interfaces/vehicle';
import { GpsService } from 'src/app/platform/services/gps.service';
import { VehiclesService } from 'src/app/platform/services/vehicles.service';
import { BaseComponent } from 'src/app/platform/shared/components/base.component';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './gps-vehicle-list.component.html',
  styleUrls: ['./gps-vehicle-list.component.scss']
})
export class GpsVehicleListComponent extends BaseComponent implements OnInit {

  markers: { [imei: string]: google.maps.Marker; } = {};

  vehiclesStates!: VehicleState[];
  drawVehcilePositionsEvery5Seconds: Subscription | undefined;

  itemSelected: string | null = null;
  searchText = '';

  onMapCreatedSubscription: any;

  @ViewChild('chartContainer', { static: true }) chartContainer?: ElementRef<HTMLDivElement>;

  constructor(public router: Router, public gps_service: GpsService, public vehicle_service: VehiclesService) {
    super();

    this.getVehicles().then(([vehicles, vehiclesImeis]) => {

      const vehiclesImeisRequest: VehiclesImeisRequest = {
        imeis: vehiclesImeis as string[],
      };

      this.drawVehcilePositionsEvery5Seconds = timer(0, 3000).subscribe(_ => {
        this.gps_service.getVehiclesStateByImeis(vehiclesImeisRequest).pipe(
          tap((response) => {
            if (this.drawVehcilePositionsEvery5Seconds?.closed) return;

            this.vehiclesStates = [];
            (vehicles as vehicle[]).forEach((vehicle) => {
              var fullDetailedVehicle: VehicleState = response.find(v => v.imei == vehicle.imei)!;

              if (fullDetailedVehicle) {
                fullDetailedVehicle!.nombre = vehicle.nombre;
                fullDetailedVehicle!.patente = vehicle.patente;

                fullDetailedVehicle!.dateStr = this.obtenerDiferenciaDeTiempo(fullDetailedVehicle!.date);


                this.drawVehicleMarker(fullDetailedVehicle.latitud, fullDetailedVehicle.longitud, fullDetailedVehicle.azimuth - 180, vehicle.imei)

                this.vehiclesStates.push(fullDetailedVehicle);
              }
            });

          })
        ).subscribe();
      });

    });
  }

  async getVehicles() {
    var vehiclesResponse = await firstValueFrom(this.vehicle_service.getAll())
    var vehicles = vehiclesResponse.filter(v => v.imei !== undefined);
    var vehiclesImeis: string[] = vehicles.map((vehicle) => vehicle.imei);
    return [vehicles, vehiclesImeis];
  }

  ngOnInit(): void {
    this.onMapCreatedSubscription = this.gps_service.onMapCreated
      .subscribe(isMapCreated => {
        if (isMapCreated) this.gps_service.map!.addListener('dragstart', () => {
          this.itemSelected = null;
        })
      });

    const el = document.getElementById('chart-container');
    if (el) {
      this.gps_service.setVisibilityOfSpeedGraph(el as HTMLDivElement, false);
    }

    this.gps_service.setVisibilityOfZones(false);
  }

  override ngOnDestroy(): void {
    this.onMapCreatedSubscription.unsubscribe();
    this.gps_service.map?.unbind('dragstart');
    this.drawVehcilePositionsEvery5Seconds?.unsubscribe();
    for (const [_, marker] of Object.entries(this.markers)) {
      marker.setMap(null);
    }
  }

  obtenerDiferenciaDeTiempo(fechaPasada: string): string {
    const fechaActual = new Date();
    const fechaPasadaObj = new Date(fechaPasada);

    fechaPasadaObj.setUTCHours(fechaPasadaObj.getUTCHours() + 3);

    const diferenciaEnMilisegundos = fechaActual.getTime() - fechaPasadaObj.getTime();
    const segundos = Math.floor(diferenciaEnMilisegundos / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);

    if (dias > 0) {
      return `hace ${dias} día${dias > 1 ? 's' : ''}`;
    } else if (horas > 0) {
      return `hace ${horas} hora${horas > 1 ? 's' : ''}`;
    } else if (minutos > 0) {
      return `hace ${minutos} minuto${minutos > 1 ? 's' : ''}`;
    } else {
      return `hace ${segundos} segundo${segundos > 1 ? 's' : ''}`;
    }
  }

  drawVehicleMarker(latitud: number, longitud: number, azimuth: number, imei: string) {

    var finalPosition = {
      lat: latitud,
      lng: longitud,
      azimuth: azimuth
    };

    if (imei in this.markers) {
      var currentPosition = {
        lat: this.markers[imei].getPosition()!.lat(),
        lng: this.markers[imei].getPosition()!.lng(),
        azimuth: (this.markers[imei].getIcon() as google.maps.Symbol).rotation
      }
      new Tween(currentPosition)
        .to({ lat: latitud, lng: longitud, azimuth: azimuth }, 2000)
        .easing(Easing.Linear.None)
        .onUpdate(() => {
          if (this.markers[imei] !== undefined) {
            this.markers[imei].setPosition({ lat: currentPosition.lat, lng: currentPosition.lng });
            (this.markers[imei].getIcon() as google.maps.Symbol).rotation = currentPosition.azimuth
          }
        }).start();
    }
    else {

      if (this.gps_service.isInDetails) return;

      (async () => {
        while (this.gps_service.map === undefined)
          await new Promise(resolve => setTimeout(resolve, 1000));

        var marker: google.maps.Marker = new google.maps.Marker({
          map: this.gps_service.map,
          position: finalPosition,
          icon: {
            path: "M7775 25473 c-1939 -78 -3650 -642 -4760 -1569 -619 -518 -985 -1108 -1102 -1779 -16 -93 -17 -272 -20 -2525 l-3 -2426 -408 -163 c-653 -262 -1029 -418 -1147 -477 -128 -63 -231 -137 -286 -206 l-39 -50 0 -412 0 -412 33 4 c17 2 440 54 939 116 l908 112 3 -6151 c2 -5704 4 -6157 19 -6251 78 -466 234 -822 528 -1204 98 -127 396 -424 545 -541 818 -649 2023 -1126 3470 -1374 886 -152 1689 -190 2500 -119 1022 89 2074 328 2915 664 934 372 1631 853 2059 1420 260 345 405 681 488 1130 17 90 18 436 20 6258 l3 6162 33 0 c17 -1 439 -52 937 -114 498 -62 908 -111 913 -109 4 2 7 185 7 407 l0 403 -28 39 c-39 53 -109 116 -179 160 -115 74 -347 174 -1285 550 l-398 159 0 2378 c0 1598 -3 2410 -11 2475 -89 821 -620 1579 -1535 2191 -1007 674 -2363 1104 -3864 1226 -382 30 -905 42 -1255 28z m965 -7313 c915 -54 1884 -232 2908 -535 331 -98 996 -317 1014 -334 4 -3 -87 -265 -203 -581 -116 -316 -368 -1007 -561 -1535 -192 -528 -351 -962 -353 -963 -2 -2 -183 12 -402 32 -508 46 -832 70 -1258 95 -698 41 -868 46 -1720 46 -534 0 -938 -5 -1110 -13 -672 -32 -1241 -71 -1923 -133 -189 -17 -345 -29 -346 -27 -2 1 -183 498 -404 1103 -221 605 -473 1296 -561 1535 -87 239 -156 438 -152 442 9 10 694 237 926 307 1507 453 2857 636 4145 561z m-5453 -2920 c607 -972 1039 -1871 1188 -2473 73 -298 68 -196 72 -1400 l4 -1088 -33 6 c-42 7 -1496 165 -1520 165 -17 0 -18 91 -18 2632 l0 2633 83 -125 c46 -69 147 -226 224 -350z m10066 -4781 c-5 -4 -348 -43 -763 -88 -415 -45 -768 -84 -783 -87 l-28 -6 4 1079 c3 1055 4 1080 25 1190 80 416 251 877 543 1463 238 476 570 1050 878 1515 l126 190 3 -2624 c1 -1444 -1 -2628 -5 -2632z m-8803 -2487 l0 -1667 -641 -745 -640 -745 -49 -9 c-109 -20 -170 11 -216 109 l-24 50 0 2318 c0 1274 1 2318 3 2319 2 1 1301 34 1475 36 l92 2 0 -1668z m8160 1648 c322 -6 600 -13 618 -16 l32 -5 -2 -2318 -3 -2317 -30 -59 c-44 -85 -69 -100 -166 -100 -71 0 -81 2 -104 26 -14 14 -307 351 -650 750 l-624 724 -1 1669 0 1669 173 -6 c94 -4 435 -12 757 -17z m-7192 -4290 c737 -143 1606 -244 2343 -271 771 -29 1781 59 2818 246 l246 45 26 -28 c15 -15 332 -391 705 -837 373 -445 763 -911 866 -1034 l189 -225 -93 -59 c-1428 -919 -3087 -1410 -4638 -1374 -1290 31 -2532 381 -3725 1050 -259 145 -625 371 -625 386 0 6 41 55 1088 1304 377 449 688 817 691 817 3 0 52 -9 109 -20z",
            scale: .0015,
            fillColor: "#000853",
            fillOpacity: 1,
            strokeWeight: 1,
            anchor: new google.maps.Point(8150, 9600),
            rotation: azimuth
          }
        });

        google.maps.event.addListener(marker, 'click', this.moveCameraToVehicle.bind(this, latitud, longitud));

        google.maps.event.addListener(marker, 'click', () => this.itemSelected = imei);

        this.markers[imei] = marker


      })();

    }
  }


  detail(vehicle: VehicleState) {
    this.gps_service.isInDetails = true;
    for (const [imei, marker] of Object.entries(this.markers)) {
      if (imei !== vehicle.imei) {
        marker.setMap(null);
        delete this.markers[imei]
      }
    }
    // this.router.navigate([this.getAppRoutes.platform.gps.vehicles.details.route(vehicle.imei)], {state:{vehicle: vehicle}})
    const url = '/'.concat(this.getAppRoutes.platform.gps.vehicles.details.route(vehicle.imei));
    console.log("state", vehicle);
    this.router.navigateByUrl(url, { state: { vehicle: vehicle } });
  }


  selectVehicle(imei: string) {
    this.itemSelected = imei;
  }

  moveCameraToVehicle(latitud: number, longitud: number) {
    var cameraOptions = {
      tilt: this.gps_service.map?.getTilt(),
      zoom: this.gps_service.map?.getZoom(),
      heading: this.gps_service.map?.getHeading(),
      lat: this.gps_service.map?.getCenter()!.lat()!,
      lng: this.gps_service.map?.getCenter()!.lng()!,
    }

    new Tween(cameraOptions)
      .to({ lat: latitud, lng: longitud, zoom: 17, tilt: 0, heading: 0 }, 3000)
      .easing(Easing.Quintic.InOut)
      .onComplete(() => {
        this.drawVehcilePositionsEvery5Seconds?.add()
      })
      .onUpdate(() => {
        this.gps_service.map?.moveCamera({ tilt: cameraOptions.tilt, heading: cameraOptions.heading, zoom: cameraOptions.zoom, center: { lat: cameraOptions.lat, lng: cameraOptions.lng } });
      }).start();

    function animate(time: number) {
      requestAnimationFrame(animate);
      update(time);
    }

    requestAnimationFrame(animate);
  }
}
