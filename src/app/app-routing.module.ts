import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsComponent } from './news/news.component';
import { TheatersComponent } from './theaters/theaters.component';
import { MoviesComponent } from './movies/movies.component';
import { InfoComponent } from './info/info.component';

const appRoutes: Routes = [
  { path: '', component: MoviesComponent, pathMatch: 'full' },
  { path: 'news', component: NewsComponent },
  { path: 'theaters', component: TheatersComponent },
  { path: 'info', component: InfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
