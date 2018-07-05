import { Component, OnInit } from '@angular/core';
import { ArticleItems } from '../article-items/article-items';
import { ComponentPageTitle } from '../shared/page-title/page-title';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  articles: ArticleItems[][] = [];
  constructor(public articleItems: ArticleItems, public _componentPageTitle: ComponentPageTitle) { }

  ngOnInit() {
    this._componentPageTitle.title = 'Articles';
    this.splitArticles();
  }

  private splitArticles() {
    const allArticles = this.articleItems.getAllItems();
    const odd = [];
    const even = [];
    if (allArticles && allArticles.length > 0) {
      allArticles.forEach((value, index) => {
        if (index % 2 === 0) {
          even.push(value);
        } else {
          odd.push(value);
        }
      });

      for (let i = 0; i < odd.length; i++) {
        const arr = [];
        arr.push(even[i]);
        arr.push(odd[i]);
        this.articles.push(arr);
      }

      if (odd.length < even.length) {
        const arr = [];
        arr.push(even[even.length - 1]);
        this.articles.push(arr);
      }
    }
  }



}
