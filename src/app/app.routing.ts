import { ArticleViewerComponent } from './article-viewer/article-viewer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {path: '', component: HomePageComponent, pathMatch: 'full', data: {}},
  {path: 'articles', loadChildren: './article-list/article-list.module#ArticleListModule'},
  {path: 'article', loadChildren: './article-viewer/article-viewer.module#ArticleViewerModule'},
  {path: '**', redirectTo: ''}
];
