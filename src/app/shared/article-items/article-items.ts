import {Injectable} from '@angular/core';

export interface ArticleItem {
  id: string;
  name: string;
  document: string;
}

const ARTICLES = [
  {
    id: 'autocomplete',
    name: 'AutoComplete',
    document: '/assets/documents/material-autocomplete.html',
  },
  {
    id: 'schematics',
    name: 'Schematics',
    document: '/assets/documents/material-schematics.html'
  },
  {
    id: 'creating-a-custom-form-field-control',
    name: 'Creating a custom form field control',
    document: '/assets/documents/material-creating-a-custom-form-field-control.html'
  }
];

@Injectable()
export class ArticleItems {

  getAllItems(): ArticleItem[] {
    return ARTICLES;
  }

  getItemById(id: string): ArticleItem {
    return ARTICLES.find(i => i.id === id);
  }
}
