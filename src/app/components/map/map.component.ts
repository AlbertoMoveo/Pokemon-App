import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements AfterViewInit {
  @ViewChild('autocompleteInput', { static: false }) autocompleteInput: ElementRef | undefined;

  display: any;
  center: google.maps.LatLngLiteral = { lat: 32.064782, lng: 34.771854 };
  zoom = 16;
  map: google.maps.Map | undefined;
  marker: google.maps.Marker | undefined;

  constructor(private mapService: MapService) {}

  ngAfterViewInit(): void {
    this.initMap();
    this.initAutocomplete();
  }

  private initMap(): void {
    this.map = this.mapService.initMap(this.center, this.zoom);
  }

  private initAutocomplete(): void {
    if (this.autocompleteInput) {
      this.mapService.initAutocomplete(this.autocompleteInput, (autocomplete) => {
        autocomplete.addListener('place_changed', () => this.onPlaceChanged(autocomplete));
      });
    }
  }

  private onPlaceChanged(autocomplete: any): void {
    const place = autocomplete.getPlace();

    if (!place.geometry) {
      this.autocompleteInput.nativeElement.placeholder = 'Enter a place';
    } else {
      this.display = place.name;
      this.setMapPin(place.geometry.location);
    }
  }

  private setMapPin(location: google.maps.LatLng): void {
    if (this.marker) {
      this.marker.setMap(null);
    }

    this.marker = new google.maps.Marker({
      position: location,
      map: this.map,
      title: 'Selected Place',
    });
    this.map?.panTo(location);
  }
}
