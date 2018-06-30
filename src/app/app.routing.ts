import { ArticleViewerComponent } from './article-viewer/article-viewer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { Routes } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';

export const APP_ROUTES: Routes = [
  {path: '', component: HomePageComponent, pathMatch: 'full', data: {}},
  {path: 'articles', component: ArticleListComponent, data: {}},
  {path: 'article/:id', component: ArticleViewerComponent, data: {}},
  {path: '**', redirectTo: ''}
];
