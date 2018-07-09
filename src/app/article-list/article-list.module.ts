import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleListComponent } from './article-list.component';
import { MaterialModule } from '../material/material.module';
import { ArticleItems } from '../article-items/article-items';
import { ComponentPageTitle } from '../shared/page-title/page-title';
import { RouterModule } from '@angular/router';
import { ShortSummaryPipe } from '../shared/short-summary/short-summary.pipe';
import {FlexLayoutModule} from '@angular/flex-layout';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FlexLayoutModule,
    InfiniteScrollModule
  ],
  declarations: [ArticleListComponent, ShortSummaryPipe],
  exports: [ArticleListComponent, ShortSummaryPipe],
  providers: [ArticleItems, ComponentPageTitle]
})
export class ArticleListModule { }
