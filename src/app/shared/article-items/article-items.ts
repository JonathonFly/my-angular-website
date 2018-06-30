import {Injectable} from '@angular/core';

export interface ArticleItem {
  id: string;
  name: string;
  document: string;
}

const ARTICLES = [
  {
    id: 'getting-started',
    name: 'Getting started',
    document: '/assets/documents/material-getting-started.html',
  },
  {
    id: 'schematics',
    name: 'Schematics',
    document: '/assets/documents/material-schematics.html'
  },
  {
    id: 'theming',
    name: 'Theming Angular Material',
    document: '/assets/documents/material-theming.html',
  },
  {
    id: 'theming-your-components',
    name: 'Theming your own components',
    document: '/assets/documents/material-theming-your-components.html',
  },
  {
    id: 'typography',
    name: `Using Angular Material's Typography`,
    document: '/assets/documents/material-typography.html',
  },
  {
    id: 'customizing-component-styles',
    name: 'Customizing component styles',
    document: '/assets/documents/material-customizing-component-styles.html'
  },
  {
    id: 'creating-a-custom-form-field-control',
    name: 'Creating a custom form field control',
    document: '/assets/documents/material-creating-a-custom-form-field-control.html'
  },
  {
    id: 'elevation',
    name: 'Using elevation helpers',
    document: '/assets/documents/material-elevation.html'
  },
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
