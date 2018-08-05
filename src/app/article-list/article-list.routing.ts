import { Routes, RouterModule } from '@angular/router';
import { ArticleListComponent } from './article-list.component';

const routes: Routes = [
  {path: '', component: ArticleListComponent},
];

export const ArticleListRoutes = RouterModule.forChild(routes);
