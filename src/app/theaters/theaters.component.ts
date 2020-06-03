import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  googleMaps: GooglemapsComponent;
  @Output() location = new EventEmitter<number>();
  constructor(public theaterService: theaterService) {
    this.googleMaps = new GooglemapsComponent();
    this.theathers = theaterService.news;
  }

  headers = ['name', 'address', 'phone'];

  ngOnInit(): void {}

  onSelect(singleTheater) {
    this.location.emit(singleTheater);
    console.log('test1 location ', this.location);
    console.log('test1 single ', singleTheater);
  }
}
