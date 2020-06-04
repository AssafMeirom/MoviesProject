import { Component, OnInit } from '@angular/core';
import { newsService } from '../news.service';
import { News } from '../news.model';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
})
export class NewsListComponent implements OnInit {
  news: News[] = [];

  constructor(private newsService: newsService) {
    this.news = newsService.news;
  }

  ngOnInit() {}
}
