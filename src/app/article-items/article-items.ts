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
    id: 'angular-6-service-worker-debug',
    name: 'Angular 6 Service Worker 调试记',
    document: '/assets/documents/jonathonfly-angular-6-service-worker-debug.html',
    summary: `最近在搭建自己的小站的时候，想用一下Service Worker来提高网站对于低网速环境下的友好度，主要是想利用一下Service Worker的cache功能。而且利用它，一旦缓存成功，即使在离线情况下，网站依旧能够服务。这对于我的基本都是静态页面的小站来说，一方面能减轻服务器压力，除了第一次和新内容，其他基本都从缓存读取；另一方面，加快内容加载速度，低网速条件下体验能够提升。`,
    tags: ['Angular', 'Service Worker'],
    date: '2018-07-22'
  }
];

@Injectable()
export class ArticleItems {
  constructor() {
    for (let i = 0; i < 20; i++) {
      ARTICLES.push(
        {
          id: 'jonathonfly-creating-a-custom-form-field-control' + (i + 1),
          name: 'Creating a custom form field control' + (i + 1),
          document: '/assets/documents/jonathonfly-creating-a-custom-form-field-control.html',
          summary: `It is possible to create custom form field controls that can be used inside <mat-form-field>. This can be useful if you need to create a component that shares a lot of common behavior with a form field, but adds some additional logic.
          For example in this guide we'll learn how to create a custom input for inputting US telephone numbers and hook it up to work with <mat-form-field>. Here is what we'll build by the end of this guide:`,
          tags: ['Creating', 'custom', 'field', 'control'],
          date: '2018-07-05'
        }
      );
    }
  }

  getAllItems(): ArticleItem[] {
    return ARTICLES;
  }

  getItemById(id: string): ArticleItem {
    return ARTICLES.find(i => i.id === id);
  }
}
