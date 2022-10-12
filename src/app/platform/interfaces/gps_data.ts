import { vehicle } from "./vehicle";

export interface Position{
  latitud: number;
  longitud: number;
}

export interface VehiclesImeisRequest {
    imeis: string[];
}

export interface VehicleState extends vehicle, Position {
  engine_status: boolean;
}

export interface gps_data extends Position{
    imei: string;
    speed: number;
    date: string;
  }

export interface GpsPoint extends Position {
  azimuth: number;
  speed: number;
}

export interface RouteRequest {
  imei: string;
  from: string;
  to: string;
}

export interface GpsRouteData {
  id : number;
  type: string;
  fromDate: Date;
  toDate: Date;
  fromHour: Date;
  toHour: Date;
  duration: string;
}

export interface StopRoute extends GpsRouteData, Position {
}


export interface TravelRoute extends GpsRouteData {
  km: number;
  data: GpsPoint[];
}

export interface ZoneView{
  id: number;
  empresa_id: string;
  color_linea: string;
  color_relleno: string;
  puntos: string;
  nombre: string;
  imeis: number[];
  avisar_entrada: boolean;
  avisar_salida: boolean;
  isHidden: boolean;
}

export interface ZoneRequest{
  empresa_id: string;
  color_linea: string;
  color_relleno: string;
  puntos: string;
  nombre: string;
  imeis: number[];
  avisar_entrada: boolean;
  avisar_salida: boolean;
}