import { Injectable } from '@angular/core';
import { ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private directionsService: google.maps.DirectionsService;
  private directionsDisplay: google.maps.DirectionsRenderer;
  constructor() { }

  initMap(center: google.maps.LatLngLiteral, zoom: number): google.maps.Map {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: center,
      zoom: zoom,
      mapId: '4504f8b37365c3d0'
    });
    return map;
  }

  initDirectionService(map: google.maps.Map, origin: google.maps.LatLngLiteral, destination: google.maps.LatLngLiteral): void {
    if (!this.directionsService) {
      this.directionsService = new google.maps.DirectionsService;
    }
    if (!this.directionsDisplay) {
      this.directionsDisplay = new google.maps.DirectionsRenderer;
      this.directionsDisplay.setMap(map);
    }
    const request: google.maps.DirectionsRequest = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING
    };
    this.directionsService.route(request, (response, status) => {
      if (String(status) === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        alert('Directions request failed due to ' + status);
      }
    });
  }

  resetDirections(map: google.maps.Map): void {
    this.directionsDisplay.setMap(null);
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.directionsDisplay.setMap(map);
    }

  initAutocomplete(
    inputElement: ElementRef,
    callback: (autocomplete: google.maps.places.Autocomplete) => void
  ): void {
    const autocomplete = new google.maps.places.Autocomplete(inputElement.nativeElement, {
      types: ['establishment'],
      componentRestrictions: { country: ['il'] },
      fields: ['place_id', 'geometry', 'name'],
    });
    callback(autocomplete);
  }
}
