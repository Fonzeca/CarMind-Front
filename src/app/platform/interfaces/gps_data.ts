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
  date: Date;
  speed: number;
}

export interface GpsRouteData {
  imei: string;
  from: Date;
  to: Date;
  data: GpsPoint[];
}