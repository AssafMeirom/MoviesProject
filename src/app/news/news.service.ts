import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { News } from './news.model';
@Injectable()
export class newsService {
  news: News[] = [];

  constructor(private http: HttpClient) {
    const databaseNews = this.http
      .get<{ message: any; post: any }>(
        'http://localhost:3000/api/getDBNewsToWeb'
      )
      .pipe(
        map((postData: any) => {
          return postData.map((newsIn) => {
            this.news.push(newsIn);
            return this.news;
          });
        })
      )
      .subscribe((responseData) => {
        this.news = responseData;
        //return this.news;
      });
  }

  showNews() {
    const databaseNews = this.http
      .get<{ message: any; post: any }>(
        'http://localhost:3000/api/getDBNewsToWeb'
      )
      .pipe(
        map((postData: any) => {
          return postData.map((newsIn) => {
            this.news.push(newsIn);
            return this.news;
          });
        })
      )
      .subscribe((responseData) => {
        this.news = responseData;
        //return this.news;
      });
  }
}
