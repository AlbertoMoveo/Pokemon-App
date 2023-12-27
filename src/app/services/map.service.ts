import { Injectable } from '@angular/core';
import { ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor() {}

  initMap(center: google.maps.LatLngLiteral, zoom: number): google.maps.Map {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: center,
      zoom: zoom,
      mapId: '4504f8b37365c3d0',
    });

    const draggableMarker = new google.maps.Marker({
      position: center,
      draggable: true,
      title: "Draggable marker.",
    });

    draggableMarker.addListener("click", (event) => {
      draggableMarker.setMap(null);
    });

    map.addListener("click", (event) => {
      draggableMarker.setPosition(event.latLng);
      draggableMarker.setMap(map);
    });
    return map;
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
