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
  @Input() markers = [];
  infoContent = '';

  constructor() {}
  ngOnInit() {}

  click(event: google.maps.MouseEvent) {
    console.log(event);
  }

  logCenter() {
    console.log(this.center);
  }

  openInfo(marker: MapMarker, content) {
    this.infoContent = content;
    this.info.open(marker);
  }
}
