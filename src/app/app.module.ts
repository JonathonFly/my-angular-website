import { APP_ROUTES } from './app.routing';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomePageModule } from './home-page/home-page.module';
import { NavBarModule } from './nav-bar/nav-bar.module';
import { ArticleListModule } from './article-list/article-list.module';
import { RouterModule } from '@angular/router';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ArticleViewerModule } from './article-viewer/article-viewer.module';
import {ServiceWorkerModule} from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HomePageModule,
    NavBarModule,
    ArticleListModule,
    ArticleViewerModule,
    ServiceWorkerModule.register('/ngsw-worker.js',  {enabled: environment.production}),
    RouterModule.forRoot(APP_ROUTES)
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    {provide: LocationStrategy, useClass: PathLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
