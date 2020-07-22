import { Component, OnInit } from '@angular/core';
import { Movie } from '../movies/movie.model';
import { MovieListComponent } from '../movies/movie-list/movie-list.component';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  horrorCounter: number = 0;
  comedyCounter: number = 0;
  dramaCounter: number = 0;
  actionCounter: number = 0;
  adventureCounter: number = 0;
  thrillerCounter: number = 0;
  romanceCounter: number = 0;
  mysteryCounter: number = 0;
  movies: Movie[] = [];
  countWord: string = '';
  resultAlgo: number;
  show: boolean = false;
  constructor(private http: HttpClient) {
    this.countGenres();
  }

  ngOnInit(): void {}

  async countWords() {
    let url = 'http://localhost:3000/api/CountMinSketch?';
    if (this.countWord) {
      url += 'countWord=' + this.countWord;
    }
    const databaseNews = await this.http
      .get<{ message: any; post: any }>(url)
      .pipe(
        map((postData: any) => {
          console.log('this result ', postData);
          this.resultAlgo = postData;
        })
      )
      .subscribe((responseData) => {});
  }

  async countGenres() {
    const databaseNews = await this.http
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
            this.movies.push(singleMovie);
            return this.movies;
          });
        })
      )
      .subscribe((responseData) => {
        this.getGenres();
        return this.movies;
      });
  }

  getGenres() {
    this.movies.forEach((singleMovie) => {
      if (singleMovie.Genre.toLowerCase().includes('horror')) {
        this.horrorCounter++;
      }
      if (singleMovie.Genre.toLowerCase().includes('comedy')) {
        this.comedyCounter++;
      }
      if (singleMovie.Genre.toLowerCase().includes('drama')) {
        this.dramaCounter++;
      }
      if (singleMovie.Genre.toLowerCase().includes('action')) {
        this.actionCounter++;
      }
      if (singleMovie.Genre.toLowerCase().includes('adventure')) {
        this.adventureCounter++;
      }
      if (singleMovie.Genre.toLowerCase().includes('thriller')) {
        this.thrillerCounter++;
      }
      if (singleMovie.Genre.toLowerCase().includes('romance')) {
        this.romanceCounter++;
      }
      if (singleMovie.Genre.toLowerCase().includes('mystery')) {
        this.mysteryCounter++;
      }
    });
    this.show = true;
  }
}
