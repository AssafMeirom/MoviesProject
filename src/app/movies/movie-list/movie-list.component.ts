import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Movie } from '../movie.model';
import { movieService } from '../movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit, OnDestroy {
  show: boolean = true;
  edit: boolean = false;
  createMovie: boolean = false;
  advancedMovies: boolean = false;
  singleMovieEdit: Movie;
  singleMovieID: String;
  singleMovieCreate: Movie;
  @Input() movies: Movie[] = [];
  advancedFromYear: string = '';
  advancedRuntime: string = '';
  constructor(private movieServices: movieService) {
    this.movies = this.movieServices.movies2;
  }

  ngOnInit(): void {
    this.movieServices.listen('testevent').subscribe((data) => {});
    this.movieServices.listen('deleteEvent').subscribe((data) => {});
    this.movieServices.movieSubject.subscribe((movies: Movie[]) => {
      this.movies = [...movies];
    });
  }

  ngOnDestroy() {
    this.movieServices.movieSubject.unsubscribe();
  }

  getAllMovies() {
    this.movies = this.movieServices.movies2;
  }

  Search(titleSearch: string, yearSearch: string, genreSearch: string) {
    this.movieServices.filterInDb(titleSearch, yearSearch, genreSearch);
    this.getAllMovies();
  }
  cleanSearch() {
    this.movieServices.showAllMovies();
    this.getAllMovies();
  }
  searchAdvancedLogic(year: string, runtime: string) {
    this.showAdvancedTable();
    this.advancedMovies = true;
    let aMovies = this.movieServices.advancedFilterInDb(year, runtime);
    console.log('this adnced', aMovies);
    this.getAllMovies();
  }

  cleanAdvancedSearch() {
    this.show = true;
    this.movieServices.showAllMovies();
    this.advancedMovies = false;
    //this.getAllMovies();
  }

  addPostToMongo() {
    this.createMovie = true;
    this.show = false;
  }

  sendUpdateMovie() {
    this.movieServices.editPost(
      this.singleMovieEdit.id,
      this.singleMovieEdit.Year,
      this.singleMovieEdit.Title
    );
    this.show = true;
    this.edit = false;
  }

  sendCreatedMovie(
    Title: string,
    Year: string,
    Runtime: number,
    Plot: string,
    Genre: string,
    imdbRating: string,
    imagePath: string
  ) {
    this.singleMovieCreate = new Movie(
      null,
      Title,
      Year,
      Runtime,
      Genre,
      Plot,
      '0',
      imdbRating,
      imagePath
    );
    this.movieServices.addPostToMongo(this.singleMovieCreate);
    this.getAllMovies();
    this.show = true;
    this.createMovie = false;
  }

  backToList() {
    this.show = true;
    this.edit = false;
    this.createMovie = false;
  }

  showAdvancedTable() {
    this.show = false;
  }
}
