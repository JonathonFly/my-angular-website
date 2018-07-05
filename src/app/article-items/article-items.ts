import { Injectable } from '@angular/core';

export interface ArticleItem {
  id: string;
  name: string;
  document: string;
  summary: string;
  tags: string[];
  date: string;
}

const ARTICLES = [
  {
    id: 'autocomplete',
    name: 'AutoComplete',
    document: '/assets/documents/material-autocomplete.html',
    summary: `The autocomplete is a normal text input enhanced by a panel of suggested options.
    Simple autocomplete
    Start by adding a regular matInput to your template. Let's assume you're using the formControl directive from ReactiveFormsModule to track the value of the input.`,
    tags: ['test1', 'test2', 'test3', 'test4'],
    date: '2018-07-01'
  },
  {
    id: 'schematics',
    name: 'Schematics',
    document: '/assets/documents/material-schematics.html',
    summary: `Angular Material comes packaged with Angular CLI schematics to make creating Material applications easier.
    Install Schematics
    Schematics come packaged with Angular Material, so once you have installed the npm package, they will be available via the Angular CLI.`,
    tags: ['Angular', 'Material', 'comes', 'packaged'],
    date: '2018-07-03'
  },
  {
    id: 'jonathonfly-creating-a-custom-form-field-control',
    name: 'Creating a custom form field control',
    document: '/assets/documents/jonathonfly-creating-a-custom-form-field-control.html',
    summary: `It is possible to create custom form field controls that can be used inside <mat-form-field>. This can be useful if you need to create a component that shares a lot of common behavior with a form field, but adds some additional logic.
    For example in this guide we'll learn how to create a custom input for inputting US telephone numbers and hook it up to work with <mat-form-field>. Here is what we'll build by the end of this guide:`,
    tags: ['Creating', 'custom', 'field', 'control'],
    date: '2018-07-05'
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
