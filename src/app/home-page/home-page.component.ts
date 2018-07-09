import { Component, OnInit } from '@angular/core';
import { ComponentPageTitle } from '../shared/page-title/page-title';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(public _componentPageTitle: ComponentPageTitle) { }

  ngOnInit() {
    this._componentPageTitle.title = 'HomePage';
  }

}
