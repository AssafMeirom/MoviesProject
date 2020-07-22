import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { newsService } from './news.service';
import { News } from './news.model';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers: [newsService],
})
export class NewsComponent implements OnInit {
  posts: News[] = [];
  isLoading = false;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {}

  // showNews() {
  //   const databaseNews = this.http
  //     .get<{ post: Post[] }>('http://localhost:3000/api/getDBNewsToWeb')
  //     .subscribe((responseData: any) => {
  //       this.posts = responseData;
  //       console.log('called inside func', this.posts);
  //       return this.posts;
  //     });

  //   const databaseNews = this.http
  //     .get<{ message: string; post: Post[] }>(
  //       'http://localhost:3000/api/getDBNewsToWeb'
  //     )
  //     .subscribe((responseData) => {
  //       return responseData;
  //     });
  //}

  sendNews() {
    const databaseNews = this.http
      .get<{ message: string; post: News[] }>(
        'http://localhost:3000/api/getDBNews'
      )
      .subscribe((responseData) => {
        console.log('database', responseData);
      });
  }
}
