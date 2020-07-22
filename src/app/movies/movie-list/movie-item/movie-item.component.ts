import { Component, OnInit, Input, Inject } from '@angular/core';
import { Movie } from '../../movie.model';
import { movieService } from '../../movie.service';
import { MovieListComponent } from '../movie-list.component';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css'],
})
export class MovieItemComponent implements OnInit {
  @Input() movie: Movie;
  constructor(
    public movieService: movieService,
    public movieListComponent: MovieListComponent
  ) {}

  ngOnInit(): void {}

  onDelete(postId) {
    this.movieService.deletePost(postId);
  }

  openDialog(movieId: String, mPlot: string, mTitle: string, mYear: string) {
    this.movieListComponent.show = false;
    this.movieListComponent.edit = true;
    this.movieListComponent.singleMovieID = movieId;
    this.movieListComponent.singleMovieEdit = this.movieService.movies2.find(
      (movie) => movie.id === movieId
    );
  }
}
