import { Injectable } from '@angular/core';
import { GpsPoint } from 'src/app/platform/interfaces/gps_data';

@Injectable({
  providedIn: 'root'
})
export class GeoOperationsService {

  constructor() { }

  degreesOfTwoPoints(p1: google.maps.LatLng, p2: google.maps.LatLng): number {
    var radianDegrees = Math.atan2(p2.lng() - p1.lng(), p2.lat() - p1.lat());
    var degrees = (radianDegrees * 180) / Math.PI;
    return degrees;
  }

  /**
   * Calcula la distancia entre dos puntos (lat/lng) en metros usando la fórmula de Haversine.
   * @param p1 Primer punto (google.maps.LatLng)
   * @param p2 Segundo punto (google.maps.LatLng)
   * @returns Distancia en metros
   */
  distanceOf2Points(p1: google.maps.LatLng, p2: google.maps.LatLng): number {
    const R = 6371000; // Radio de la Tierra en metros
    const lat1 = p1.lat() * Math.PI / 180;
    const lat2 = p2.lat() * Math.PI / 180;
    const deltaLat = (p2.lat() - p1.lat()) * Math.PI / 180;
    const deltaLng = (p2.lng() - p1.lng()) * Math.PI / 180;

    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  timestampToTime(timestamp: number): string {
    return new Date(timestamp).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false });
  }

  cleanUpRouteBySpeedAnomaly(route: GpsPoint[]): GpsPoint[] {
    const cleanedRoute: GpsPoint[] = [];
    const speedThreshold = 350; // Speed threshold in km/h

    if (route.length < 2) {
      return route;
    }

    for (let i = 1; i < route.length; i++) {
      const currentPoint = route[i];
      const previousPoint = route[i - 1];

      if (currentPoint.timestamp === previousPoint.timestamp) {
        continue;
      }

      const distanceOfPointsMeters = this.distanceOf2Points(
        new google.maps.LatLng(previousPoint.latitud, previousPoint.longitud),
        new google.maps.LatLng(currentPoint.latitud, currentPoint.longitud)
      );

      const distanceOfPoints = distanceOfPointsMeters / 1000; // Convert to kilometers

      const timeDifferenceMilliseconds = currentPoint.timestamp - previousPoint.timestamp; // in milliseconds
      const timeDiffHours = timeDifferenceMilliseconds / 3600000; // Convert to hours

      const speed = (distanceOfPoints / timeDiffHours); // Convert to km/h

      if (speed > speedThreshold) {
        console.log(`Anomaly detected: Speed ${speed} km/h between points at ${this.timestampToTime(currentPoint.timestamp)} and ${this.timestampToTime(previousPoint.timestamp)}`);
        continue;
      }
      cleanedRoute.push(currentPoint);
    }

    return cleanedRoute;

  }

}
