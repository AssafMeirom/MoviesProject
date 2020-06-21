import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie.model';
import { movieService } from '../movie.service';
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  title: string = '';
  year: string = '';
  genre: string = '';
  movies: Movie[] = [];
  advancedFromYear: string = '';
  advancedRuntime: string = '';

  constructor(private movieServices: movieService) {
    this.movies = this.movieServices.movies;
  }

  ngOnInit(): void {}

  getAllMovies() {
    this.movies = this.movieServices.movies;
  }

  searchLogic() {
    this.movieServices.filterInDb(this.title, this.year, this.genre);
    this.movies = this.movieServices.movies;
  }
  cleanSearch() {
    this.title = '';
    this.year = '';
    this.genre = '';
    this.movieServices.showAllMovies();
    this.movies = this.movieServices.movies;
  }
  searchAdvancedLogic() {
    console.log('testing the stuff ', this.advancedFromYear);
    console.log('testing the stuff3 ', this.advancedRuntime);
    this.movieServices.advancedFilterInDb(
      this.advancedFromYear,
      this.advancedRuntime
    );
    this.movies = this.movieServices.movies;
  }

  cleanAdvancedSearch() {
    this.advancedFromYear = '';
    this.advancedRuntime = '';
    this.movieServices.showAllMovies();
    this.movies = this.movieServices.movies;
  }
}
