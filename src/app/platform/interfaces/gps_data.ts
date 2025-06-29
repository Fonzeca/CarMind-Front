import { vehicle } from "./vehicle";

export interface Position {
  latitud: number;
  longitud: number;
}

export interface VehiclesImeisRequest {
  imeis: string[];
}

export interface VehicleState extends vehicle, Position {
  engine_status: boolean;
  date: string;
  dateStr: string;
}

export interface gps_data extends Position {
  imei: string;
  speed: number;
  date: string;
}

export interface GpsPoint {
  azimuth: number;
  latitud: number;
  longitud: number;
  speed: number;
  timestamp: string;
}

export interface RouteRequest {
  imei: string;
  from: string;
  to: string;
}

export interface GpsRouteData {
  id: number;
  type: "Parada" | "Viaje";
  fromDate: Date;
  toDate: Date;
  fromHour: Date;
  toHour: Date;
  duration: string;
  latitud?: number;
  longitud?: number;
  km?: number;
  data?: GpsPoint[];
}

export interface ZoneView {
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
  velocidad_maxima?: number;

  zonePolygon?: google.maps.Polygon;
}

export interface ZoneRequest {
  empresa_id: number;
  color_linea: string;
  color_relleno: string;
  puntos: string;
  nombre: string;
  imeis: string[];
  avisar_entrada: boolean;
  avisar_salida: boolean;
  velocidad_maxima?: number;
}