import { Component, OnInit, Output } from '@angular/core';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';

import { theaterService } from './theaters.service';
import { Theaters } from './theaters.model';
import { GooglemapsComponent } from './googlemaps/googlemaps.component';
@Component({
  selector: 'app-theaters',
  templateUrl: './theaters.component.html',
  styleUrls: ['./theaters.component.css'],
  providers: [theaterService],
})
export class TheatersComponent implements OnInit {
  theathers: Theaters[] = [];
  theather: Theaters;
  googleMaps: GooglemapsComponent;
  center: google.maps.LatLngLiteral = {
    lat: null,
    lng: null,
  };

  constructor(public theaterService: theaterService) {
    this.googleMaps = new GooglemapsComponent();
    this.theathers = theaterService.news;
  }

  headers = ['name', 'address', 'phone'];

  ngOnInit(): void {}

  onSelect(singleTheater) {
    this.center.lat = parseFloat(singleTheater.lat);
    this.center.lng = parseFloat(singleTheater.alt);
    console.log('testing', this.center);
    // this.newCenter.lat = parseFloat(singleTheater.lat);
    // this.newCenter.lng = parseFloat(singleTheater.lng);
    //this.googleMaps.moveToLocation(this.newCenter);
  }
}
