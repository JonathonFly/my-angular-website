import { Routes, RouterModule } from '@angular/router';
import { ArticleViewerComponent } from './article-viewer.component';

const routes: Routes = [
  {path: 'item/:id', component: ArticleViewerComponent, data: {}},
];

export const ArticleViewerRoutes = RouterModule.forChild(routes);
