import {
  Component,
  OnInit,
  Input,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';
@Component({
  selector: 'app-googlemaps',
  templateUrl: './googlemaps.component.html',
  styleUrls: ['./googlemaps.component.css'],
})
export class GooglemapsComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow;

  zoom = 12;
  @Input() center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    center: new google.maps.LatLng(0, 0),
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    mapTypeId: 'roadmap',
    maxZoom: 30,
    minZoom: 8,
  };
  markers = [];
  infoContent = '';

  constructor() {}
  ngOnInit() {}

  onMarkerSelected(newCenter: google.maps.LatLngLiteral) {
    const newCenterLat = newCenter.lat;
    const newCenterLng = newCenter.lng;
    this.center = {
      lat: +newCenterLat,
      lng: +newCenterLng,
    };
    this.markers.push({
      position: {
        lat: this.center.lat,
        lng: this.center.lng,
      },
      label: {
        color: 'red',
      },
      options: {
        animation: google.maps.Animation.BOUNCE,
      },
    });
  }

  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++;
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--;
  }

  click(event: google.maps.MouseEvent) {
    console.log(event);
  }

  logCenter() {
    console.log(this.center);
  }

  addMarker() {
    this.markers.push({
      position: {
        lat: this.center.lat,
        lng: this.center.lng,
      },
      label: {
        color: 'red',
      },
      options: {
        animation: google.maps.Animation.BOUNCE,
      },
    });
  }

  openInfo(marker: MapMarker, content) {
    this.infoContent = content;
    this.info.open(marker);
  }
}
