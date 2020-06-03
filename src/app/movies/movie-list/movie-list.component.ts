import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [
    new Movie('assaf','assaf test', 'https://www.philoshit.co.il/wp-content/uploads/2012/11/inception.jpg')
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
