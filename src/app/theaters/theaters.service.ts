import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Theaters } from './theaters.model';
@Injectable()
export class theaterService {
  news: Theaters[] = [];

  constructor(private http: HttpClient) {
    const databaseNews = this.http
      .get<{ message: any; post: any }>('http://localhost:3000/api/getTheaters')
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
      });
  }
}
