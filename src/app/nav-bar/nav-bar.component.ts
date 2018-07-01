import { Component, OnInit, AfterViewInit } from '@angular/core';
import {Splash} from 'splash-screen';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit,AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
  }

}
