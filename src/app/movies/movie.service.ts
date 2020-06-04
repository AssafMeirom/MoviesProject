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
      .subscribe((responseData) => {
        this.movies = responseData;
      });
  }
}
