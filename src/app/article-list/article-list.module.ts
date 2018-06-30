import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleListComponent } from './article-list.component';
import { MaterialModule } from '../material/material.module';
import { ArticleItems } from '../shared/article-items/article-items';
import { ComponentPageTitle } from '../shared/page-title/page-title';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  declarations: [ArticleListComponent],
  exports: [ArticleListComponent],
  providers: [ArticleItems, ComponentPageTitle]
})
export class ArticleListModule { }
