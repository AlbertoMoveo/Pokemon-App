import { Component, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MapService } from '../../services/map/map.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements AfterViewInit {
  @ViewChild('autocompleteInput', { static: false }) autocompleteInput: ElementRef | undefined;

  display: any;
  center: google.maps.LatLngLiteral = { lat: 32.064782, lng: 34.771854 };
  from: google.maps.LatLngLiteral = null;
  to: google.maps.LatLngLiteral = { lat: 32.064782, lng: 34.771854 };
  zoom = 16;
  map: google.maps.Map;
  marker: google.maps.Marker;


  constructor(private mapService: MapService, private ref: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.initMap();
    this.initAutocomplete();
    this.setMapPin(this.center);
  }

  private initMap(): void {
    this.map = this.mapService.initMap(this.center, this.zoom);
  }

  private initDirectionService(): void {
    this.mapService.initDirectionService(this.map, this.from, this.to);
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
      this.from = place.geometry.location;
    }
  }

  private setMapPin(location: google.maps.LatLngLiteral): void {
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

  startDirections(): void {
    this.to = { lat: 32.064782, lng: 34.771854 };
    this.initDirectionService();
  }

  clearDirections(): void {
    this.mapService.resetDirections(this.map);
    this.autocompleteInput.nativeElement.value = '';
    this.setMapPin(this.center);
  }
}
