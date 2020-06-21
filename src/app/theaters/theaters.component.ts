import { Component, OnInit, Output } from '@angular/core';
import { theaterService } from './theaters.service';
import { Theaters } from './theaters.model';
@Component({
  selector: 'app-theaters',
  templateUrl: './theaters.component.html',
  styleUrls: ['./theaters.component.css'],
  providers: [theaterService],
})
export class TheatersComponent implements OnInit {
  theathers: Theaters[] = [];
  name: string;
  address: string;
  phone: string;

  center: google.maps.LatLngLiteral = {
    lat: 31.979674,
    lng: 34.747586,
  };

  constructor(public theaterService: theaterService) {
    this.theathers = theaterService.news;
  }

  headers = ['name', 'address', 'phone'];

  ngOnInit(): void {}

  onSelect(singleTheater: Theaters) {
    this.center = { lat: +singleTheater.lat, lng: +singleTheater.alt };
  }

  searchLogic() {
    this.theaterService.filterInDb(this.name, this.address, this.phone);
    this.theathers = this.theaterService.news;
  }

  cleanSearch() {
    this.name = '';
    this.address = '';
    this.phone = '';
    this.theaterService.showAllMovies();
    this.theathers = this.theaterService.news;
  }
}
