import { Component, OnInit } from '@angular/core';
import { newsService } from '../news.service';
import { Post } from '../../../../Backend/post.js';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
})
export class NewsListComponent implements OnInit {
  news: any;

  constructor(private newsService: newsService) {}

  ngOnInit() {
    this.news = this.newsService.showNews();
  }
}
