export interface gps_data {
    imei: string;
    latitud: number;
    longitud: number;
    speed: number;
    date: string;
  }

export interface GpsPoint {
  latitud: number;
  longitud: number;
  azimuth: number;
  speed: number;
}

export interface RouteRequest {
  imei: string;
  from: string;
  to: string;
}

export interface GpsRouteData {
  type: string;
  fromDate: Date;
  toDate: Date;
  fromHour: Date;
  toHour: Date;
}

export interface StopRoute extends GpsRouteData {
  latitud: number;
  longitud: number;
}


export interface TravelRoute extends GpsRouteData {
  km: number;
  data: GpsPoint[];
}

