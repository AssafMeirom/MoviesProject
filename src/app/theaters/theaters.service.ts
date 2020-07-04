import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Theaters } from './theaters.model';
@Injectable()
export class theaterService {
  news: Theaters[] = [];

  constructor(private http: HttpClient) {
    const databaseNews = this.http
      .get<{ message: any; post: any }>('http://localhost:3000/api/getTheaters')
      .pipe(
        map((postData: any) => {
          return postData.map((newsIn) => {
            let singleTheater = new Theaters(
              newsIn.name,
              newsIn.address,
              newsIn.phone,
              newsIn.lat,
              newsIn.alt
            );
            this.news.push(singleTheater);
            return this.news;
          });
        })
      )
      .subscribe((responseData) => {
        return this.news;
      });
  }

  async filterInDb(name, address, phone) {
    let url = 'http://localhost:3000/api/getTheatersSearch?';
    if (name) {
      url += 'name=' + name + '&';
    }
    if (address) {
      url += 'address=' + address + '&';
    }
    if (phone) {
      url += 'phone=' + phone;
    }
    console.log('testing the url ', url);
    const databaseNews = await this.http
      .get<{ message: any; post: any }>(url)
      .pipe(
        map((postData: any) => {
          this.news = [];
          return postData.map((newsIn) => {
            let singleMovie = new Theaters(
              newsIn.name,
              newsIn.address,
              newsIn.phone,
              newsIn.lat,
              newsIn.alt
            );
            this.news.push(singleMovie);
            return this.news;
          });
        })
      )
      .subscribe((responseData) => {
        return this.news;
      });
  }

  showAllMovies() {
    this.news = [];
    const databaseNews = this.http
      .get<{ message: any; post: any }>('http://localhost:3000/api/getTheaters')
      .pipe(
        map((postData: any) => {
          return postData.map((newsIn) => {
            let singleTheater = new Theaters(
              newsIn.name,
              newsIn.address,
              newsIn.phone,
              newsIn.lat,
              newsIn.alt
            );
            this.news.push(newsIn);
            return this.news;
          });
        })
      )
      .subscribe((responseData) => {
        return this.news;
      });
  }
}
