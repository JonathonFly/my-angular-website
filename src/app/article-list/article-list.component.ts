import { Component, OnInit } from '@angular/core';
import { ArticleItems } from '../article-items/article-items';
import { ComponentPageTitle } from '../shared/page-title/page-title';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  constructor(public articleItems: ArticleItems, public _componentPageTitle: ComponentPageTitle) { }

  ngOnInit() {
    this._componentPageTitle.title = 'Articles';
  }

}
