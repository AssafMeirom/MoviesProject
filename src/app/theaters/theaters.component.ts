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
  markers = [];
  show: boolean = true;
  edit: boolean = false;
  singleTheaterEdit: Theaters;
  singleTheaterCreate: Theaters;

  createTheater: boolean = false;
  center: google.maps.LatLngLiteral = {
    lat: 31.979674,
    lng: 34.747586,
  };

  constructor(public theaterService: theaterService) {
    this.theathers = theaterService.news;
  }

  headers = ['name', 'address', 'phone'];

  ngOnInit(): void {
    this.theaterService.listen('theaterEvent').subscribe((data) => {});
    this.theaterService.listen('deleteEvent').subscribe((data) => {});

    this.theaterService.theaterSubject.subscribe((theathers: Theaters[]) => {
      this.theathers = [...theathers];
    });
  }

  onSelect(singleTheater: Theaters) {
    this.center = { lat: +singleTheater.lat, lng: +singleTheater.alt };
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

  Search(nameSearch: string, addressSearch: string, phoneSearch: string) {
    this.theaterService.filterInDb(nameSearch, addressSearch, phoneSearch);
    this.theathers = this.theaterService.news;
  }

  cleanSearch() {
    this.theaterService.showAllMovies();
    this.theathers = this.theaterService.news;
  }

  onDelete(theaterId: string) {
    this.theaterService.deletePost(theaterId);
  }

  editDialog(
    theaterId: string,
    theaterName: string,
    theaterAddress: string,
    theaterPhone: string
  ) {
    //this.singleTheaterEdit.
    this.singleTheaterEdit = this.theaterService.news.find(
      (movie) => movie.id === theaterId
    );
    this.show = false;
    this.edit = true;
  }

  sendUpdateMovie() {
    this.theaterService.editPost(this.singleTheaterEdit.id);
    this.show = true;
    this.edit = false;
  }

  backToList() {
    this.show = true;
    this.edit = false;
    this.createTheater = false;
  }
  addPostToMongo() {
    this.createTheater = true;
    this.show = false;
  }
  sendCreatedTheater(
    name: string,
    address: string,
    phone: string,
    alt: string,
    lat: string
  ) {
    this.singleTheaterCreate = new Theaters(
      null,
      name,
      address,
      phone,
      alt,
      lat
    );
    console.log('this sing', this.singleTheaterCreate);

    this.theaterService.addPostToMongo(this.singleTheaterCreate);
    this.theathers = this.theaterService.news;
    this.show = true;
    this.createTheater = false;
  }
}
