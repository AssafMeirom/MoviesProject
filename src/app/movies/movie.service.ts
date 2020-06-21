import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Movie } from './movie.model';
@Injectable()
export class movieService {
  movies: Movie[] = [];

  constructor(private http: HttpClient) {
    const databaseNews = this.http
      .get<{ message: any; post: any }>('http://localhost:3000/api/getMovies')
      .pipe(
        map((postData: any) => {
          return postData.map((newsIn) => {
            this.movies.push(newsIn);
            return this.movies;
          });
        })
      )
      .subscribe((responseData) => {});
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
          this.movies = [];
          return postData.map((newsIn) => {
            let singleMovie = new Movie(
              newsIn.Title,
              newsIn.Year,
              newsIn.Runtime,
              newsIn.Genre,
              newsIn.Plot,
              newsIn.Metascore,
              newsIn.imdbRating,
              newsIn.imagePath
            );
            this.movies.push(singleMovie);
            console.log('the movies :', this.movies);
            return this.movies;
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
          this.movies = [];
          return postData.map((newsIn) => {
            let singleMovie = new Movie(
              newsIn.Title,
              newsIn.Year,
              newsIn.Runtime,
              newsIn.Genre,
              newsIn.Plot,
              newsIn.Metascore,
              newsIn.imdbRating,
              newsIn.imagePath
            );
            this.movies.push(singleMovie);
            return this.movies;
          });
        })
      )
      .subscribe((responseData) => {
        return this.movies;
      });
  }

  showAllMovies() {
    console.log('movies ', this.movies);
    const databaseNews = this.http
      .get<{ message: any; post: any }>('http://localhost:3000/api/getMovies')
      .pipe(
        map((postData: any) => {
          this.movies = [];
          return postData.map((newsIn) => {
            this.movies.push(newsIn);
            return this.movies;
          });
        })
      )
      .subscribe((responseData) => {
        console.log('movies ', this.movies);
      });
  }
}
