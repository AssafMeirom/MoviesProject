import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Theaters } from './theaters.model';
import { Subject, Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable()
export class theaterService {
  news: Theaters[] = [];
  socket: any;
  theaterSubject = new Subject<Theaters[]>();
  url: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {
    this.socket = io(this.url, {
      path: '/api/getTheaters',
    });
    // const databaseNews = this.http
    //   .get<{ message: any; post: any }>('http://localhost:3000/api/getTheaters')
    //   .pipe(
    //     map((postData: any) => {
    //       return postData.map((newsIn) => {
    //         let singleTheater = new Theaters(
    //           newsIn._id,
    //           newsIn.name,
    //           newsIn.address,
    //           newsIn.phone,
    //           newsIn.lat,
    //           newsIn.alt
    //         );
    //         this.news.push(singleTheater);
    //         return this.news;
    //       });
    //     })
    //   )
    //   .subscribe((responseData) => {
    //     this.theaterSubject.next(this.news);
    //   });
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
              newsIn._id,
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
              newsIn._id,
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

  deletePost(postId: String) {
    this.http
      .delete('http://localhost:3000/api/postsTheaters/' + postId)
      .subscribe(() => {
        console.log('deleted');
      });
  }

  editPost(postId: String) {
    const theater: Theaters = this.news.find((findId) => findId.id === postId);
    this.http
      .put('http://localhost:3000/api/postsTheaters/' + postId, theater)
      .subscribe((response) => {
        const updatedMovies = [...this.news];
        const oldMoviesIndex = updatedMovies.findIndex(
          (p) => p.id === theater.id
        );
        updatedMovies[oldMoviesIndex] = theater;
        this.news = updatedMovies;
      });
  }

  addPostToMongo(singleMovieCreated: Theaters) {
    let theater: Theaters = singleMovieCreated;
    this.http
      .post<{ message: string; postId: string }>(
        'http://localhost:3000/api/postsTheaters/',
        theater
      )
      .subscribe((response) => {
        console.log('response is ', response);
        const postId = response.postId;
        theater.id = postId;
        this.news.push(theater);
      });
  }

  listen(eventName: string) {
    console.log('event name ', eventName);
    if (eventName == 'theaterEvent') {
      return new Observable((subscriber) => {
        this.socket.on(eventName, (data: any) => {
          data.forEach((newsIn) => {
            let singleTheater = new Theaters(
              newsIn._id,
              newsIn.name,
              newsIn.address,
              newsIn.phone,
              newsIn.lat,
              newsIn.alt
            );
            this.news.push(newsIn);
          });
          subscriber.next();
        });
      });
    }

    if (eventName == 'deleteEvent') {
      console.log('inside delete event');
      return new Observable((subscriber) => {
        this.socket.on(eventName, (data: any) => {
          const updatedMovies = [...this.news];
          const oldMoviesIndex = updatedMovies.findIndex(
            (p) => p.id === data._id
          );
          updatedMovies.splice(oldMoviesIndex, 1);
          this.news = updatedMovies;
          this.theaterSubject.next(this.news);
        });
      });
    }
  }

  emit(eventName: string, data: any) {
    console.log('inside func : ', data);
    this.socket.emit(eventName, data);
  }
}
