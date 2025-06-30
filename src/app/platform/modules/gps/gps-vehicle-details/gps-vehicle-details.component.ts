import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Easing, Tween, update } from "@tweenjs/tween.js";
import { Chart, ChartTypeRegistry, ScaleOptionsByType } from 'chart.js';
import { DeepPartial } from 'chart.js/types/utils';
import { catchError, tap } from 'rxjs';
import { GpsPoint, GpsRouteData, RouteRequest, VehicleState } from 'src/app/platform/interfaces/gps_data';
import { AuthService } from 'src/app/platform/services/auth.service';
import { GpsService } from 'src/app/platform/services/gps.service';
import { BaseComponent } from 'src/app/platform/shared/components/base.component';
import { GeoOperationsService } from '../util/geo-operations.service';

@Component({
  selector: 'app-gps-details',
  templateUrl: './gps-vehicle-details.component.html',
  styleUrls: ['./gps-vehicle-details.component.scss']
})
export class GpsVehicleDetailsComponent extends BaseComponent implements OnInit {


  selectedVehicleMarker: google.maps.marker.AdvancedMarkerElement | undefined;

  dateTimeRange: Date[] | undefined;
  dateTimeFrom: string = '';
  dateTimeTo: string = '';
  dateHaveErrors: boolean = false;
  isGettingRoutes: boolean = false;

  // DOM Elements - cached for performance
  private rastreadorButton: HTMLElement | null = null;
  private scaleCheckbox: HTMLInputElement | null = null;
  private checkMostrarGrafico: HTMLInputElement | null = null;
  private checkMostrarZonas: HTMLInputElement | null = null;
  private speedCartel: HTMLElement | null = null;

  isAnimate: boolean = false;
  itemSelected: number | null = null;

  vehicle: VehicleState | undefined;
  polylines: google.maps.Polyline[] = [];
  markers: google.maps.marker.AdvancedMarkerElement[] = [];

  // directionalMarkers: google.maps.Marker[] = [];
  carMarker: google.maps.marker.AdvancedMarkerElement | null = null;
  startTrip: google.maps.marker.AdvancedMarkerElement | null = null;
  endTrip: google.maps.marker.AdvancedMarkerElement | null = null;

  carIcon: HTMLImageElement | null = null;


  travelRoutes: GpsRouteData[] = [];
  totalKms: number = 0;
  totalStops: number = 0;

  rawRouteData: GpsRouteData[] = [];

  currentChart: Chart | null = null;

  speed: number = 0;

  // Performance optimizations
  private speedColorMap: Map<number, string> = new Map();
  private latLngPool: google.maps.LatLng[] = [];
  private poolIndex: number = 0;

  constructor(private router: Router,
    private route: ActivatedRoute,
    public gps_service: GpsService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private geo_operations: GeoOperationsService,
    private auth: AuthService) {

    super();
    gps_service.isInDetails = true;

    if (this.router.getCurrentNavigation() === null || this.router.getCurrentNavigation()!.extras.state! === undefined) {

    } else {
      this.vehicle = this.router.getCurrentNavigation()!.extras.state!['vehicle'];
    }

    //   <canvas baseChart width="400" height="280"
    //   [type]="'line'"
    //   [data]="lineChartData"
    //   [options]="lineChartOptions"
    //   [legend]="lineChartLegend">
    // </canvas>

  }

  initialize() {
    if (!this.vehicle) {
      this.gps_service.getVehiclesStateByImeis({ imeis: [this.route.snapshot.params['id']] })
        .pipe(
          tap((response) => {
            this.vehicle = response[0];
            //TODO: obtener los datos del nombre por algun otro lado, ya que el nombre no viene en el objeto vehicle
            this.selectedVehicleMarker = new google.maps.marker.AdvancedMarkerElement({
              map: this.gps_service.map,
              position: new google.maps.LatLng(this.vehicle!.latitud, this.vehicle!.longitud),
              content: this.carIcon
            });
            this.setDegToIconCar(this.vehicle!.azimuth);
          }),
          catchError((error) => {
            this.router.navigateByUrl(this.getAppRoutes.platform.gps.vehicles.route);
            return error;
          })
        ).subscribe();

    } else {
      this.selectedVehicleMarker = new google.maps.marker.AdvancedMarkerElement({
        map: this.gps_service.map,
        position: new google.maps.LatLng(this.vehicle!.latitud, this.vehicle!.longitud),
        content: this.carIcon
      });
      this.setDegToIconCar(this.vehicle!.azimuth);
    }

    this.carIcon = document.createElement('img');
    this.carIcon.src = 'assets/gps/car.svg';
    this.carIcon.style.height = '48px';
    this.carIcon.style.width = '43px';


    // const testMarker = new google.maps.marker.AdvancedMarkerElement({
    //   map: this.gps_service.map,
    //   position: new google.maps.LatLng(-48.143622, -67.652320),
    //   content: this.carIcon
    // });


  }


  //Esto es necesario para que cuando se haga click en el botón del menú Rastreador (botón que se encuentra fuera de este componente, se borre la ruta)
  navButtonHandler: any;
  scaleCheckBoxHandler: any;
  checkMostrarGraficoHandler: any;
  checkMostrarZonasHandler: any;
  dragHandler: google.maps.MapsEventListener | undefined;

  ngOnInit() {
    this.clearRoute();
    this.initializeDOMElements();
    this.initializeSpeedColorMap();

    if (!this.gps_service.map) {
      this.gps_service.onMapCreated.subscribe((response) => {
        this.initialize();
        this.setupEventListeners();
      });
    } else {
      this.initialize();
    }

    this.gps_service.fetchZones(this.auth).then(() => {
      this.gps_service.setVisibilityOfZones(false);
    }).catch((error) => {
      console.error('Error fetching zones:', error)
    });
  }

  private initializeDOMElements(): void {
    this.rastreadorButton = document.getElementById('rastreadorIcon');
    this.scaleCheckbox = document.getElementById('scaleCheckbox') as HTMLInputElement;
    this.checkMostrarGrafico = document.getElementById('checkMostrarGrafico') as HTMLInputElement;
    this.checkMostrarZonas = document.getElementById('checkMostrarZonas') as HTMLInputElement;
    this.speedCartel = document.getElementById('speedCartel');
  }

  private initializeSpeedColorMap(): void {
    // Pre-populate speed color map for better performance
    const speedRanges = [
      { max: 5, color: '#0020BD' },
      { max: 10, color: '#102BAE' },
      { max: 15, color: '#21369F' },
      { max: 20, color: '#314190' },
      { max: 25, color: '#424C81' },
      { max: 30, color: '#525572' },
      { max: 35, color: '#636263' },
      { max: 40, color: '#736D54' },
      { max: 45, color: '#847845' },
      { max: 50, color: '#998632' },
      { max: 55, color: '#B1981B' },
      { max: 60, color: '#CEAC00' },
      { max: 65, color: '#D29E00' },
      { max: 70, color: '#D78D00' },
      { max: 75, color: '#DB7F00' },
      { max: 80, color: '#DF7100' },
      { max: 85, color: '#E46000' },
      { max: 90, color: '#E85200' },
      { max: 95, color: '#EC4400' },
      { max: 100, color: '#F03600' },
      { max: 105, color: '#F42900' },
      { max: 110, color: '#F71F00' },
      { max: 115, color: '#FB1100' }
    ];

    for (let speed = 0; speed <= 200; speed++) {
      const range = speedRanges.find(r => speed < r.max);
      this.speedColorMap.set(speed, range ? range.color : '#FF0000');
    }
  }

  private setupEventListeners(): void {
    this.navButtonHandler = this.clearRoute.bind(this);
    this.rastreadorButton?.addEventListener("click", this.navButtonHandler, true);
    this.dragHandler = this.gps_service.map?.addListener('dragstart', this.hideSpeed.bind(this));

    this.scaleCheckBoxHandler = () => {
      this.loadChart(this.rawRouteData, this.scaleCheckbox?.checked || false);
    }
    this.scaleCheckbox?.addEventListener('change', this.scaleCheckBoxHandler, true);
  }

  ngAfterViewInit() {
    this.checkMostrarGrafico = document.getElementById('checkMostrarGrafico') as HTMLInputElement;
    const el = document.getElementById('chart-container');
    if (el) {
      this.gps_service.setVisibilityOfSpeedGraph(el as HTMLDivElement, false);
    }
    this.checkMostrarGraficoHandler = () => {
      if (this.checkMostrarGrafico?.checked) {
        this.gps_service.setVisibilityOfSpeedGraph(el as HTMLDivElement, true);
      } else {
        this.gps_service.setVisibilityOfSpeedGraph(el as HTMLDivElement, false);
      }
    }
    this.checkMostrarGrafico?.addEventListener('change', this.checkMostrarGraficoHandler, true);

    // Mostrar zonas
    this.checkMostrarZonas = document.getElementById('checkMostrarZonas') as HTMLInputElement;
    this.checkMostrarZonasHandler = () => {
      if (this.checkMostrarZonas?.checked) {
        this.gps_service.setVisibilityOfZones(true);
      } else {
        this.gps_service.setVisibilityOfZones(false);
      }
    }
    this.checkMostrarZonas?.addEventListener('change', this.checkMostrarZonasHandler, true);
  }


  override ngOnDestroy(): void {
    this.dragHandler?.remove();
    this.rastreadorButton?.removeEventListener('click', this.navButtonHandler)
    this.scaleCheckbox?.removeEventListener('change', this.scaleCheckBoxHandler)
    this.checkMostrarGrafico?.removeEventListener('change', this.checkMostrarGraficoHandler)
    this.checkMostrarZonas?.removeEventListener('change', this.checkMostrarZonasHandler)
    this.gps_service.isInDetails = false;
    if (this.selectedVehicleMarker) {
      this.selectedVehicleMarker.map = null;
    }
  }


  getRoute() {

    this.isGettingRoutes = true;

    this.travelRoutes = [];
    this.totalKms = 0;
    this.totalStops = 0;

    if (this.dateTimeFrom.length <= 0 || this.dateTimeTo.length <= 0) return;

    if (this.selectedVehicleMarker) {
      this.selectedVehicleMarker.map = null;
    }

    const routeRequest: RouteRequest = {
      imei: this.vehicle!.imei,
      from: this.dateTimeFrom,
      to: this.dateTimeTo
    };

    this.gps_service
      .getRouteByImei(routeRequest)
      .pipe(
        tap((route: GpsRouteData[]) => {

          if (route.length <= 0) {
            this.isGettingRoutes = false;
            return;
          };

          this.rawRouteData = route;

          for (var i = 0; i < route.length; i++) {
            let currentRoute = route[i];
            if (currentRoute.type === 'Parada') {
              // Si es una parada, no se dibuja la ruta

              if (!currentRoute.latitud || !currentRoute.longitud) {
                console.warn(`Ruta con ID ${currentRoute.id} no tiene latitud o longitud definida.`);
                continue;
              }

              this.totalStops += 1;

              const startAndEndPoints: google.maps.LatLng[] = [];

              //Enlazo el ultimo punto de la ruta anterior
              if (i >= 1) {
                const previousRoute = route[i - 1];
                if (previousRoute.type === 'Viaje' && previousRoute.data) {
                  startAndEndPoints.push(new google.maps.LatLng({
                    lat: previousRoute.data[previousRoute.data.length - 1].latitud,
                    lng: previousRoute.data[previousRoute.data.length - 1].longitud
                  }));
                }
              }

              //Seteo el punto de parada
              startAndEndPoints.push(new google.maps.LatLng({
                lat: currentRoute.latitud,
                lng: currentRoute.longitud
              }));

              //Enlazo el primer punto del viaje siguiente
              if (i + 1 < route.length) {
                const nextRoute = route[i + 1];
                if (nextRoute.type === 'Viaje' && nextRoute.data) {
                  startAndEndPoints.push(new google.maps.LatLng({
                    lat: nextRoute.data[0].latitud,
                    lng: nextRoute.data[0].longitud
                  }));
                }
              }

              //Obtengo la cantidad de tiempo que se quedo en la parada y la seteo en la parada
              currentRoute.duration = this.getDuration(currentRoute.fromDate.toString(), currentRoute.toDate.toString(), currentRoute.fromHour.toString(), currentRoute.toHour.toString());

              //Agrego la parada para que se renderice en la lista
              this.travelRoutes.push(currentRoute);

              if (i != 0) {
                //Dibujo una marca para que se sepa que es una parada
                this.drawRouteMarker(currentRoute.latitud, currentRoute.longitud, this.createIcons('stop'), currentRoute);
              }

              //Dibujo las lineas correspondientes a la parada
              this.drawRoutePolyline(startAndEndPoints, 'green', -1)

            } else {
              if (!currentRoute.data || currentRoute.data.length <= 0) {
                console.warn(`Ruta con ID ${currentRoute.id} no tiene datos.`);
                continue;
              }
              
              // Limpiamos los datos de la ruta por si hay anomalias de velocidad
              currentRoute.data = this.geo_operations.cleanUpRouteBySpeedAnomaly(currentRoute.data);

              //Obtenemos la duracion del viaje y la seteo en el objeto viaje
              currentRoute.duration = this.getDuration(currentRoute.fromDate.toString(), currentRoute.toDate.toString(), currentRoute.fromHour.toString(), currentRoute.toHour.toString());

              //Acumulador de total de kilometros recorridos
              if (currentRoute.km) {
                this.totalKms += currentRoute.km;
              }

              //Agrego el viaje para que se renderice en la lista
              this.travelRoutes.push(currentRoute);


              // this.drawRouteMarker(travelRoute.data[0].latitud, travelRoute.data[0].longitud);

              this.drawRoutePolylines(currentRoute.data, currentRoute.id);
            }
          }

          this.loadChart(route, this.scaleCheckbox?.checked || false);

          //Centra la camara a todo la ruta
          var points: google.maps.LatLng[] = []
          this.polylines.forEach((line) => {
            line.getPath().getArray().forEach((point) => { points.push(point) })
          })
          this.moveCameraToRoute(points);

          //Se dibuja las banderas de inicio y fin
          this.drawStartAndEndOfTrip()

          // Debounced event handler for better performance
          const debouncedDragHandler = this.debounce(() => {
            this.itemSelected = null;
            this.polylines.forEach((item) => {
              item.setOptions({ strokeOpacity: 1 });
            })

            this.markers.forEach(marker => {
              if (marker === this.startTrip || marker === this.endTrip) return;
              marker.content = this.createIcons('stop');
            });
          }, 100);

          this.gps_service.map?.addListener('dragstart', debouncedDragHandler);
          this.isGettingRoutes = false;
        })
      ).subscribe();

    this.gps_service.map?.addListener("zoom_changed", this.debounce(() => {
      var weight = this.gps_service.map?.getZoom()! > 15 ? 8 : 5;

      // Batch update polyline styles
      this.polylines.forEach((item) => {
        item.setOptions({ strokeWeight: weight })
      });
    }, 150));
  }

  loadChart(route: GpsRouteData[], scaleX: boolean) {
    const speedData: {
      speed: number;
      timestamp: number;
      latitud: number;
      longitud: number;
      azimuth: number;
    }[] = [];

    route.forEach((item) => {
      if (item.data) {
        speedData.push(...item.data.map((point: any) => ({
          speed: point.speed,
          timestamp: point.timestamp,
          latitud: point.latitud,
          longitud: point.longitud,
          azimuth: point.azimuth
        })));
      }
    });

    this.showChart(speedData, scaleX);
  }

  async showChart(data: { speed: number, timestamp: number, latitud: number, longitud: number, azimuth: number }[], scaleX: boolean) {
    this.currentChart?.destroy();
    if (data.length <= 0) return;

    await new Promise((resolve) => setTimeout(resolve, 100));

    const canvasContainer = document.getElementById('chart-container') as HTMLDivElement | null;
    if (!canvasContainer) {
      console.error('No chart container found');
      return;
    }

    const chartContainer = document.createElement('canvas');
    chartContainer.id = 'chart-canvas';
    chartContainer.height = 250;
    chartContainer.style.width = '100%';

    canvasContainer.querySelectorAll('canvas').forEach((canvas) => canvas.remove());
    canvasContainer.appendChild(chartContainer);


    let scales: DeepPartial<{
      [key: string]: ScaleOptionsByType<ChartTypeRegistry['line']['scales']>;
    }> | undefined = undefined;
    if (scaleX) {
      scales = {
        x: {
          type: 'time',
          display: true,
          time: {
            unit: 'minute',
            displayFormats: {
              minute: 'HH:mm'
            },
          },
          adapters: {
            date: {
              // zone: '+03:00',
              // setZone: true
            }
          }
        }
      }
    }


    const chart = new Chart(chartContainer, {
      type: 'line',
      data: {
        labels: data.map((item) => scaleX ? new Date(item.timestamp) : this.geo_operations.timestampToTime(item.timestamp)),
        datasets: [
          {
            data: data.map((item) => item.speed),
            label: 'Velocidad',
            fill: true,
            tension: 0,
            borderColor: 'black',
            backgroundColor: 'rgba(255,0,0,0.3)',
            pointRadius: 0,

          }
        ]
      },
      options: {
        responsive: false,
        events: ['mousemove', 'mousedown', 'mouseup'],
        plugins: {
          corsair: {
            nearCallback: (index: number) => {
              this.drawCarDeg(new google.maps.LatLng(data[index].latitud, data[index].longitud), data[index].azimuth);
            },
          }
        },
        scales: scales
      }
    });

    this.currentChart = chart;

  }

  getDuration(fromDateString: string, toDateString: string, fromHourString: string, toHourString: string) {
    let fromDate = new Date(fromDateString + " " + fromHourString);
    let toDate = new Date(toDateString + " " + toHourString);
    let diffMs = (toDate.getTime() - fromDate.getTime());
    let diffHrs = Math.floor((diffMs % 86400000) / 3600000);
    let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    return diffHrs.toString() + "hs " + diffMins.toString() + "min";
  }

  drawRouteMarker(latitud: number, longitud: number, icon: HTMLElement | null, stopLog: GpsRouteData | null = null) {

    var marker: google.maps.marker.AdvancedMarkerElement = new google.maps.marker.AdvancedMarkerElement({
      map: this.gps_service.map,
      position: {
        lat: latitud,
        lng: longitud,
      },
      gmpClickable: true,
    });
    if (icon != null) marker.content = icon;
    this.markers.push(marker);

    const clickHandler = () => {
      if (stopLog != null) this.selectTravelOrStop(stopLog)
    }

    marker.addListener('click', clickHandler)
    marker.content?.addEventListener('click', clickHandler);
  }

  // setDirectionOfPath(points: google.maps.LatLng[]) {
  //   points.forEach((point, i) => {
  //     if (i == 0) return;
  //     if (i == points.length) return;

  //     var p1 = points[i - 1];
  //     var p2 = point;

  //     var lat_medio = (p1.lat() + p2.lat()) / 2;
  //     var lng_medio = (p1.lng() + p2.lng()) / 2;
  //     var puntoMedio = new google.maps.LatLng({ lat: lat_medio, lng: lng_medio });
  //     var radianDegrees = Math.atan2(p2.lng() - p1.lng(), p2.lat() - p1.lat());
  //     var degrees = radianDegrees * 180 / Math.PI;
  //     // icon.rotation = degrees;


  //     var marker: google.maps.Marker = new google.maps.Marker({
  //       position: puntoMedio,
  //     });
  //     marker.setIcon(this.icon);
  //     (marker.getIcon() as google.maps.Symbol).rotation = degrees;
  //     this.directionalMarkers.push(marker);
  //   });
  // }

  // drawDirectionalMarkers() {
  //   if (this.gps_service.map === undefined) return;
  //   var map = this.gps_service.map;

  //   if (map.getZoom()! > 15) {
  //     this.directionalMarkers.forEach((value) => {
  //       if (value.getMap() == null) {
  //         if (map!.getBounds()?.contains(value.getPosition()!)) {
  //           value.setMap(map!);
  //         } else {
  //           value.setMap(null);
  //         }
  //       }
  //     });
  //   } else {
  //     this.directionalMarkers.forEach((value) => {
  //       value.setMap(null);
  //     });
  //   }
  // }


  drawRoutePolyline(points: google.maps.LatLng[], colorLine: string, id: number, speed?: number) {
    // this.setDirectionOfPath(points);
    var polyLinePoints: google.maps.MVCArray<google.maps.LatLng> = new google.maps.MVCArray<google.maps.LatLng>(points);
    var singlePolyline = new google.maps.Polyline({
      path: polyLinePoints,
      map: this.gps_service.map,
      strokeColor: colorLine,
      strokeWeight: 3,
      // draggable: true,
    });
    singlePolyline.set("id", id);
    singlePolyline.set("originalColor", colorLine);
    singlePolyline.addListener("click", (event: google.maps.PolyMouseEvent) => {
      this.clearCarMarker();
      this.drawCar(event.latLng!, points)
      if (speed != undefined) {
        this.drawSpeed(speed, event)
      }
    })
    singlePolyline.addListener("mouseover", (event: google.maps.PolyMouseEvent) => {
      // this.drawCar(event.latLng!, points)
    })
    singlePolyline.addListener("mousemove", (event: google.maps.PolyMouseEvent) => {
      // this.drawCar(event.latLng!, points)
    })
    singlePolyline.addListener("mouseout", (event: google.maps.PolyMouseEvent) => {
      // this.clearCarMarker();
      // this.hideSpeed();
    })
    this.polylines.push(singlePolyline);
  }

  // Optimized LatLng creation with object pooling
  private getLatLng(lat: number, lng: number): google.maps.LatLng {
    if (this.poolIndex < this.latLngPool.length) {
      const latLng = this.latLngPool[this.poolIndex];
      // Reset the LatLng object with new coordinates
      (latLng as any).lat = () => lat;
      (latLng as any).lng = () => lng;
      this.poolIndex++;
      return latLng;
    } else {
      const newLatLng = new google.maps.LatLng(lat, lng);
      this.latLngPool.push(newLatLng);
      this.poolIndex++;
      return newLatLng;
    }
  }

  private resetLatLngPool(): void {
    this.poolIndex = 0;
  }

  drawRoutePolylines(points: GpsPoint[], id: number) {
    if (points.length > 0) {
      // this.resetLatLngPool();
      var polyLinePoints: google.maps.LatLng[] = [];
      var speed: number = 0;
      var color: string = 'black';
      var previousColor: string = 'black';
      var previousLat = 0;
      var previousLng = 0;

      for (var i = 0; i < points.length; i++) {
        if (previousLat == points[i].latitud && previousLng == points[i].longitud) continue;

        speed = points[i].speed;
        color = this.speedToColorOptimized(speed);

        polyLinePoints.push(this.getLatLng(points[i].latitud, points[i].longitud));

        if (polyLinePoints.length >= 2 || color != previousColor || i + 1 == points.length) {

          if (i + 1 == points.length) {
            this.drawRoutePolyline(polyLinePoints, color, id, speed);
          } else {
            this.drawRoutePolyline(polyLinePoints, previousColor, id, speed);
          }

          polyLinePoints = [];
          polyLinePoints.push(this.getLatLng(points[i].latitud, points[i].longitud));
        }
        previousColor = color;
        previousLat = points[i].latitud;
        previousLng = points[i].longitud;
      }
    }
  }

  // Optimized speed to color function using memoization
  speedToColorOptimized(speed: number): string {
    const roundedSpeed = Math.floor(speed);
    return this.speedColorMap.get(roundedSpeed) || '#FF0000';
  }

  drawStartAndEndOfTrip() {
    var startPosition: google.maps.LatLng | null = null;
    var endPosition: google.maps.LatLng | null = null;
    if (this.startTrip != null) {
      this.startTrip.map = null;
      this.startTrip = null;
    }
    if (this.endTrip != null) {
      this.endTrip.map = null;
      this.endTrip = null;
    }

    if (this.polylines.length >= 2) {
      var length = this.polylines.length;
      startPosition = this.polylines[0].getPath().getAt(0);

      var lengthOfLast = this.polylines[length - 1].getPath().getLength();
      endPosition = this.polylines[length - 1].getPath().getAt(lengthOfLast - 1);
    }

    if (startPosition != null && endPosition != null) {
      var startmarker: google.maps.marker.AdvancedMarkerElement = new google.maps.marker.AdvancedMarkerElement({
        map: this.gps_service.map,
        position: {
          lat: startPosition.lat(),
          lng: startPosition.lng(),
        },
      });
      startmarker.content = this.createIcons('start');
      this.startTrip = startmarker;

      var endMarker: google.maps.marker.AdvancedMarkerElement = new google.maps.marker.AdvancedMarkerElement({
        map: this.gps_service.map,
        position: {
          lat: endPosition.lat(),
          lng: endPosition.lng(),
        },
      });
      endMarker.content = this.createIcons('end');
      this.endTrip = endMarker;
    }


  }

  speedToColor(speed: number) {
    // Use the optimized version
    return this.speedToColorOptimized(speed);
  }

  drawCar(point: google.maps.LatLng, path: google.maps.LatLng[]) {
    var deg: number = 0;
    deg = this.geo_operations.degreesOfTwoPoints(path[0], path[1])

    this.drawCarDeg(point, deg);
  }

  drawCarDeg(point: google.maps.LatLng, deg: number) {
    if (this.carMarker == null) {
      this.carMarker = new google.maps.marker.AdvancedMarkerElement({
        map: this.gps_service.map,
        position: point,
        content: this.carIcon,
      });

      this.setDegToIconCar(deg);

    } else {
      this.setDegToIconCar(deg);
      

      this.carMarker.position = point;
    }
  }

  drawSpeed(speed: number, event: google.maps.PolyMouseEvent) {
    const domEvent: MouseEvent = event.domEvent as MouseEvent;
    const xOffset = window.pageXOffset + 30;
    const yOffset = window.pageYOffset - 20;

    const screenX = domEvent.clientX + xOffset;
    const screenY = domEvent.clientY + yOffset;
    this.speed = speed;

    // Use cached DOM element
    if (this.speedCartel) {
      this.speedCartel.style.display = 'block';
      this.speedCartel.style.left = screenX + 'px';
      this.speedCartel.style.top = screenY + 'px';
      this.speedCartel.innerHTML = speed + ' km/h';
    }
  }

  hideSpeed() {

    if (this.speedCartel) {
      this.speedCartel.style.display = 'none';
    }
  }


  moveCameraToRoute(positions: google.maps.LatLng[]) {
    var bounds = new google.maps.LatLngBounds();

    positions.forEach(position => bounds.extend(position));
    this.gps_service.map!.fitBounds(bounds);
  }

  selectTravelOrStop(route: GpsRouteData) {


    this.itemSelected = route.id;
    // this.mylist.find((item)=>{
    //   if(item.nativeElement.id == travelRoute.id){
    //     item.nativeElement.scrollIntoView();
    //   }
    //   return false
    // })
    if (route.type === 'Viaje') {
      this.resaltarRuta(route);
      this.moveCamera(route);
    } else {
      this.moveCamera(route);

      this.markers.forEach(marker => {
        if (marker === this.startTrip || marker === this.startTrip) return;


        // Check if marker.position.lat is a function or a variable
        let lat: number | undefined;
        let lng: number | undefined;
        if (marker.position === null || marker.position === undefined) return;
        if (typeof marker.position.lat === 'function' && typeof marker.position.lng === 'function') {
          lat = marker.position.lat();
          lng = marker.position.lng();
        } else {
          lat = marker.position.lat as number;
          lng = marker.position.lng as number;
        }
        // Check if the marker position matches the route's latitud and longitud
        if (lat == route.latitud && lng == route.longitud) {
          marker.content = this.createIcons('stopRed');
        } else {
          marker.content = this.createIcons('stop');
        }
      });
    }
  }


  resaltarRuta(travelRoute: GpsRouteData) {
    this.polylines.forEach((item) => {
      item.setOptions({ strokeOpacity: 1 })
      if (item.get("id") == travelRoute.id) {
      } else {
        item.setOptions({ strokeOpacity: 0.3 })
      }
    })
  }

  moveCamera(route: GpsRouteData) {
    if (route.type === 'Parada') {
      if (!route.latitud || !route.longitud) {
        console.warn(`Ruta con ID ${route.id} no tiene latitud o longitud definida.`);
        return;
      }

      const latitud: number = route.latitud;
      const longitud: number = route.longitud;

      this.moveCameraToMarker(latitud, longitud);
    } else {
      if (!route.data || route.data.length <= 0) {
        console.warn(`Ruta con ID ${route.id} no tiene datos.`);
        return;
      }

      const positions: GpsPoint[] = route.data;

      this.moveCameraToRoute(positions.map(p => new google.maps.LatLng(p.latitud, p.longitud)));
    }
  }

  moveCameraToMarker(latitud: number, longitud: number) {
    var cameraOptions = {
      tilt: this.gps_service.map?.getTilt(),
      zoom: this.gps_service.map?.getZoom(),
      heading: this.gps_service.map?.getHeading(),
      lat: this.gps_service.map?.getCenter()!.lat()!,
      lng: this.gps_service.map?.getCenter()!.lng()!,
    }

    new Tween(cameraOptions)
      .to({ lat: latitud, lng: longitud, zoom: 15, tilt: 0, heading: 0 }, 2000)
      .easing(Easing.Quintic.InOut)
      .onStart(() => {
        this.isAnimate = true;
      })
      .onUpdate(() => {
        this.gps_service.map?.moveCamera({ tilt: cameraOptions.tilt, heading: cameraOptions.heading, zoom: cameraOptions.zoom, center: { lat: cameraOptions.lat, lng: cameraOptions.lng } });
      })
      .onComplete(() => {
        this.isAnimate = false;
      })
      .start();


    function animate(time: number) {
      requestAnimationFrame(animate);
      update(time);
    }

    requestAnimationFrame(animate);
  }

  @HostListener('window:popstate', ['$event'])
  onPopState() {
    this.clearRoute();
  }

  dateTimeRangeClosed() {
    this.dateHaveErrors = false;

    if (this.dateTimeRange === undefined) return;

    if (this.dateTimeRange!.length != 2) {
      this.dateHaveErrors = true;
      return;
    }
    var dateFrom: string = this.dateTimeRange![0].toISOString().substring(0, 10);
    var timeFrom: string = this.dateTimeRange![0].toTimeString().substring(0, 8);

    var dateTo: string = this.dateTimeRange![1].toISOString().substring(0, 10);
    var timeTo: string = this.dateTimeRange![1].toTimeString().substring(0, 8);

    const dateTimeFrom = dateFrom + " " + timeFrom;
    const dateTimeTo = dateTo + " " + timeTo;

    if (dateTimeFrom.includes('1970') || dateTimeTo.includes('1970')) {
      this.dateHaveErrors = true;
      return;
    }

    if (this.dateTimeFrom === dateTimeFrom && this.dateTimeTo === dateTimeTo) {
      return;
    }

    this.clearRoute();

    this.dateTimeFrom = dateTimeFrom;
    this.dateTimeTo = dateTimeTo;

    this.getRoute();
  }

  clearCarMarker() {
    if (this.carMarker != null) {
      this.carMarker.map = null;
      this.carMarker = null;
    }
  }

  clearRoute() {
    this.clearCarMarker();

    // Batch DOM operations for better performance
    const markersToRemove = [...this.markers];
    const polylinesToRemove = [...this.polylines];

    // Clear markers in batch
    markersToRemove.forEach(marker => marker.map = null);

    // Clear polylines in batch
    polylinesToRemove.forEach(polyline => polyline.setMap(null));

    // Clear trip markers
    if (this.endTrip != null) {
      this.endTrip.map = null;
      this.endTrip = null;
    }
    if (this.startTrip != null) {
      this.startTrip.map = null;
      this.startTrip = null;
    }

    // Reset arrays
    this.polylines = [];
    this.markers = [];

    // Reset LatLng pool for reuse
    this.resetLatLngPool();
  }

  private createIcons(type: "stop" | "stopRed" | "start" | "end") {

    switch (type) {
      case "stop":

        const stopImg = document.createElement('img');
        stopImg.src = 'assets/gps/stop.svg';
        stopImg.style.height = '20px';
        stopImg.style.width = '20px';


        return stopImg;
      case "stopRed":
        const stopRedImg = document.createElement('img');
        stopRedImg.src = 'assets/gps/stop-red.svg';
        stopRedImg.style.height = '30px';
        stopRedImg.style.width = '30px';

        return stopRedImg;
      case "start":
        const startTripImg = document.createElement('img');
        startTripImg.src = 'assets/gps/start.svg';
        startTripImg.style.height = '50px';
        startTripImg.style.width = '50px';

        return startTripImg;
      case "end":
        const endTripImg = document.createElement('img');
        endTripImg.src = 'assets/gps/end.svg';
        endTripImg.style.height = '50px';
        endTripImg.style.width = '50px';

        return endTripImg;
    }

  }

  // Debouncing utility
  private debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
    let timeout: any;
    return ((...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    }) as T;
  }

  private setDegToIconCar(deg: number) {
    if (!this.carIcon) return;
    this.carIcon.style.transform = `translate(0%, 50%) rotate(${deg}deg)`;
  }

}
