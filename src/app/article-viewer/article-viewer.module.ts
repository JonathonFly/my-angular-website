import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleViewerComponent } from './article-viewer.component';
import { RouterModule } from '@angular/router';
import { ComponentPageTitle } from '../shared/page-title/page-title';
import { ArticleItems } from '../shared/article-items/article-items';
import { TableOfContentsModule } from '../shared/table-of-contents/table-of-contents.module';
import { DocViewerModule } from '../shared/doc-viewer/doc-viewer-module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TableOfContentsModule,
    DocViewerModule
  ],
  declarations: [ArticleViewerComponent],
  exports: [ArticleViewerComponent],
  providers: [ArticleItems, ComponentPageTitle]
})
export class ArticleViewerModule { }
