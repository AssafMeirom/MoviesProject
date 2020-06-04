import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie.model';
import { movieService } from '../movie.service';
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [
    new Movie(
      'Inception',
      '2010',
      '148 min',
      'Action, Adventure, ci-Fi, Thriller',
      'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
      '74',
      '8.8'
    ),
  ];
  constructor(private movieService: movieService) {
    this.movies = movieService.movies;
    console.log('the service is', this.movies);
  }

  ngOnInit(): void {}
}
