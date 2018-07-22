import { Component, ViewEncapsulation, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Splash } from 'splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit, OnDestroy {
  intervalId;
  timeOutId;
  constructor(router: Router) {
    let previousRoute = router.routerState.snapshot.url;

    router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((data: NavigationEnd) => {
        // We want to reset the scroll position on navigation except when navigating within
        // the documentation for a single component.
        if (!isNavigationWithinComponentView(previousRoute, data.urlAfterRedirects)) {
          resetScrollPosition();
        }

        previousRoute = data.urlAfterRedirects;
      });
  }

  // ngAfterViewInit(){
  //   console.log('ngAfterViewInit')
  //   let i=0;
  //   let interval = setInterval(() => {
  //     i++;
  //     console.log('do in interval'+i)
  //     if (Splash.isRunning()) {
  //       console.log('clear interval condition matched')
  //       Splash.destroy();
  //       console.log('start clear interval')
  //       clearInterval(interval);
  //       console.log('end clear interval')
  //     }
  //   }, 5);
  // }

  ngAfterViewInit(){
    this.intervalId = setInterval(() => {
      if (Splash.isRunning()) {
        Splash.destroy();
        this.clear();
      }
    }, 50);
  }

  clear(){
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  ngOnDestroy(){
    this.clear();

  }
}

function isNavigationWithinComponentView(oldUrl: string, newUrl: string) {
  const componentViewExpression = /components\/(\w+)/;
  return oldUrl && newUrl
    && componentViewExpression.test(oldUrl)
    && componentViewExpression.test(newUrl)
    && oldUrl.match(componentViewExpression)[1] === newUrl.match(componentViewExpression)[1];
}

function resetScrollPosition() {
  if (typeof document === 'object' && document) {
    const sidenavContent = document.querySelector('.mat-drawer-content');
    if (sidenavContent) {
      sidenavContent.scrollTop = 0;
    }
  }
}

