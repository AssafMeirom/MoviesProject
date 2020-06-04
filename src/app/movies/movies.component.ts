import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { movieService } from './movie.service';
import { Movie } from './movie.model';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers: [movieService],
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  constructor(private http: HttpClient) {}
  ngOnInit(): void {}
}
