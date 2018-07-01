import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ArticleItem, ArticleItems } from '../shared/article-items/article-items';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentPageTitle } from '../shared/page-title/page-title';

@Component({
  selector: 'app-article-viewer',
  templateUrl: './article-viewer.component.html',
  styleUrls: ['./article-viewer.component.scss']
})
export class ArticleViewerComponent implements OnInit {
  article: ArticleItem;

  constructor(_route: ActivatedRoute,
    private _componentPageTitle: ComponentPageTitle,
    private router: Router,
    public articleItems: ArticleItems) {
    _route.params.subscribe(p => {
      this.article = articleItems.getItemById(p['id']);

      if (!this.article) {
        this.router.navigate(['/articles']);
      }
    });
  }

  ngOnInit() {
    this._componentPageTitle.title = this.article.name;
  }

}
