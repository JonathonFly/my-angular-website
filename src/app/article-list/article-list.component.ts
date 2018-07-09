import { Component, OnInit } from '@angular/core';
import { ArticleItems, ArticleItem } from '../article-items/article-items';
import { ComponentPageTitle } from '../shared/page-title/page-title';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  articles: ArticleItems[][] = [];
  allArticles = [];
  totalSize = 0;
  array = [];
  sum = 10;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = '';

  scrollLength=4;

  constructor(public articleItems: ArticleItems, public _componentPageTitle: ComponentPageTitle) { }

  ngOnInit() {
    this._componentPageTitle.title = 'Articles';
    this.allArticles = this.articleItems.getAllItems();
    this.totalSize = this.allArticles.length;
    this.appendItems(0,this.sum);
    this.articles = this.splitArticles(this.array);
  }

  private splitArticles(allArticles: ArticleItem[]) {
    const articles = [];
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
        articles.push(arr);
      }

      if (odd.length < even.length) {
        const arr = [];
        arr.push(even[even.length - 1]);
        articles.push(arr);
      }
    }
    return articles;
  }

  addItems(startIndex, length, _method) {
    let len = length;
    if (this.totalSize < startIndex + length) {
      len = this.totalSize - startIndex;
    }
    for (let i = 0; i < len; ++i) {
      this.array[_method](this.allArticles[startIndex + i]);
    }
    this.articles = this.splitArticles(this.array);
  }

  appendItems(startIndex, length) {
    this.addItems(startIndex, length, 'push');
  }

  prependItems(startIndex, length) {
    this.addItems(startIndex, length, 'unshift');
  }

  onScrollDown(ev) {
    const start = this.sum;
    this.sum += this.scrollLength;
    this.appendItems(start, this.scrollLength);

    this.direction = 'down';
  }

  // onUp(ev) {
  //   const start = this.sum;
  //   this.sum += this.scrollLength;
  //   this.prependItems(start, this.sum);

  //   this.direction = 'up';
  // }


}
