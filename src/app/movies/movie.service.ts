import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Movie } from './movie.model';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { Subject } from 'rxjs';

@Injectable()
export class movieService implements OnInit {
  socket: any;
  movies: Movie[] = [];
  movies2: Movie[] = [];
  movieSubject = new Subject<Movie[]>();

  url: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {
    this.socket = io(this.url, {
      path: '/api/getMovies',
    });
    // const databaseNews = this.http
    //   .get<{ message: any; post: any }>('http://localhost:3000/api/getMovies')
    //   .pipe(
    //     map((postData: any) => {
    //       return postData.map((newsIn) => {
    //         let singleMovie = new Movie(
    //           newsIn._id,
    //           newsIn.Title,
    //           newsIn.Year,
    //           newsIn.Runtime,
    //           newsIn.Genre,
    //           newsIn.Plot,
    //           newsIn.Metascore,
    //           newsIn.imdbRating,
    //           newsIn.imagePath
    //         );
    //         this.movies.push(singleMovie);
    //       });
    //     })
    //   )
    //   .subscribe((responseData) => {});
  }

  ngOnInit() {}
  listen(eventName: string) {
    console.log('event name ', eventName);
    if (eventName == 'testevent') {
      return new Observable((subscriber) => {
        this.socket.on(eventName, (data: any) => {
          data.forEach((newsIn) => {
            let singleMovie = new Movie(
              newsIn._id,
              newsIn.Title,
              newsIn.Year,
              newsIn.Runtime,
              newsIn.Genre,
              newsIn.Plot,
              newsIn.Metascore,
              newsIn.imdbRating,
              newsIn.imagePath
            );
            this.movies2.push(singleMovie);
          });
          subscriber.next();
        });
      });
    }
    if (eventName == 'deleteEvent') {
      return new Observable((subscriber) => {
        this.socket.on(eventName, (data: any) => {
          const updatedMovies = [...this.movies2];
          const oldMoviesIndex = updatedMovies.findIndex(
            (p) => p.id === data._id
          );
          updatedMovies.splice(oldMoviesIndex, 1);
          this.movies2 = updatedMovies;
          this.movieSubject.next(this.movies2);
        });
      });
    }
  }

  emit(eventName: string, data: any) {
    console.log('inside func : ', data);
    this.socket.emit(eventName, data);
  }

  async filterInDb(title, year, genre) {
    let url = 'http://localhost:3000/api/getMoviesSearch?';
    if (title) {
      url += 'title=' + title + '&';
    }
    if (genre) {
      url += 'genre=' + genre + '&';
    }
    if (year) {
      url += 'year=' + year;
    }
    const databaseNews = await this.http
      .get<{ message: any; post: any }>(url)
      .pipe(
        map((postData: any) => {
          this.movies2 = [];
          return postData.map((newsIn) => {
            let singleMovie = new Movie(
              newsIn._id,
              newsIn.Title,
              newsIn.Year,
              newsIn.Runtime,
              newsIn.Genre,
              newsIn.Plot,
              newsIn.Metascore,
              newsIn.imdbRating,
              newsIn.imagePath
            );
            this.movies2.push(singleMovie);
            return this.movies2;
          });
        })
      )
      .subscribe((responseData) => {
        return this.movies;
      });
  }

  async advancedFilterInDb(advancedFromYear, advancedRuntime) {
    let url = 'http://localhost:3000/api/testingMongo?';
    if (advancedFromYear) {
      url += 'advancedFromYear=' + advancedFromYear + '&';
    }
    if (advancedRuntime) {
      url += 'advancedRuntime=' + advancedRuntime;
    }

    console.log('full url ', url);
    const databaseNews = await this.http
      .get<{ message: any; post: any }>(url)
      .pipe(
        map((postData: any) => {
          this.movies2 = [];
          return postData.map((newsIn) => {
            let singleMovie = new Movie(
              newsIn._id,
              newsIn.Title,
              newsIn.Year,
              newsIn.Runtime,
              newsIn.Genre,
              newsIn.Plot,
              newsIn.Metascore,
              newsIn.imdbRating,
              newsIn.imagePath
            );
            this.movies2.push(singleMovie);
            return this.movies2;
          });
        })
      )
      .subscribe((responseData) => {
        return this.movies2;
      });
  }

  deletePost(postId: String) {
    this.http
      .delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        console.log('deleted');
      });
  }

  editPost(postId: String, year: String, title: String) {
    const movie: Movie = this.movies2.find((findId) => findId.id === postId);
    this.http
      .put('http://localhost:3000/api/posts/' + postId, movie)
      .subscribe((response) => {
        const updatedMovies = [...this.movies2];
        const oldMoviesIndex = updatedMovies.findIndex(
          (p) => p.id === movie.id
        );
        updatedMovies[oldMoviesIndex] = movie;
        this.movies2 = updatedMovies;
      });
  }

  showAllMovies() {
    this.movies2 = [];
    const databaseNews = this.http
      .get<{ message: any; post: any }>('http://localhost:3000/api/getMovies')
      .pipe(
        map((postData: any) => {
          return postData.map((newsIn) => {
            let singleMovie = new Movie(
              newsIn._id,
              newsIn.Title,
              newsIn.Year,
              newsIn.Runtime,
              newsIn.Genre,
              newsIn.Plot,
              newsIn.Metascore,
              newsIn.imdbRating,
              newsIn.imagePath
            );
            this.movies2.push(singleMovie);
            return this.movies2;
          });
        })
      )
      .subscribe((responseData) => {
        return this.movies2;
      });
  }

  addPostToMongo(singleMovieCreated: Movie) {
    let movie: Movie = singleMovieCreated;
    this.http
      .post<{ message: string; postId: string }>(
        'http://localhost:3000/api/posts/',
        movie
      )
      .subscribe((response) => {
        console.log('response is ', response);
        const postId = response.postId;
        movie.id = postId;
        this.movies2.push(movie);
      });
  }
}
