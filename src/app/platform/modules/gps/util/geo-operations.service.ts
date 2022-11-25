import { Injectable } from '@angular/core';

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

  searchLineOfPoint(point: google.maps.LatLng, path: google.maps.LatLng[]): google.maps.LatLng[] | null {
    for (let i = 0; i < path.length; i++) {
      const item = path[i];
      if (i == 0) continue;
      if (this.isBetween2Points(point, path[i - 1], item)) {
        return [path[i - 1], item];
      }
    }
    return null;
  }

  isBetween2Points(pointToTest: google.maps.LatLng, p1: google.maps.LatLng, p2: google.maps.LatLng) {
    var distance1 = Math.round(this.distanceOf2Points(p1, pointToTest) * 10000000) / 10000000;
    var distance2 = Math.round(this.distanceOf2Points(p2, pointToTest) * 10000000) / 10000000;
    var distanceTest = Math.round(this.distanceOf2Points(p1, p2) * 10000000) / 10000000;
    return  distance1 + distance2  ==  distanceTest;
  }

  distanceOf2Points(p1: google.maps.LatLng, p2: google.maps.LatLng): number {
    var a = Math.pow(p2.lat()- p1.lat(), 2)
    var b = Math.pow(p2.lng()- p1.lng(), 2)
    return Math.sqrt(a + b);
  }
}
