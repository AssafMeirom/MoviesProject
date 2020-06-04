import { Component, OnInit, Input, ViewChild } from '@angular/core';
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
  ngOnInit() {
    this.center = {
      lng: 34.747586,
      lat: 31.979674,
    };
  }

  moveToLocation(newCenter) {
    console.log('this newCenter', newCenter);
    console.log('this center1', parseFloat(newCenter.lat));
    console.log('this center2', parseFloat(newCenter.lng));
    const test = newCenter.lat;
    const test2 = newCenter.lng;
    this.center = {
      lat: +test,
      lng: +test2,
    };
    console.log('this center', this.center);
  }

  zoomIn() {
    const test1 = '31.979674';
    const test2 = '34.747586';
    this.center = {
      lat: parseFloat(test1),
      lng: parseFloat(test2),
    };

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
        lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
      },
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
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
