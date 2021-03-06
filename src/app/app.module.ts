import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';

import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { MovieItemComponent } from './movies/movie-list/movie-item/movie-item.component';
import { NewsComponent } from './news/news.component';
import { NewsItemComponent } from './news/news-list//news-item/news-item.component';
import { NewsListComponent } from './news/news-list/news-list.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { TheatersComponent } from './theaters/theaters.component';
import { GooglemapsComponent } from './theaters/googlemaps/googlemaps.component';
import { FormsModule } from '@angular/forms';
import { D3Directive } from './d3/d3.directive';
import { InfoComponent } from './info/info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MoviesComponent,
    MovieListComponent,
    MovieItemComponent,
    NewsComponent,
    NewsItemComponent,
    NewsListComponent,
    DropdownDirective,
    TheatersComponent,
    GooglemapsComponent,
    D3Directive,
    InfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleMapsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
