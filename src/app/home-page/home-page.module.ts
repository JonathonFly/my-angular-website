import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { SvgViewerModule } from '../shared/svg-viewer/svg-viewer';
import {RouterModule} from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { ComponentPageTitle } from '../shared/page-title/page-title';

@NgModule({
  imports: [
    CommonModule,
    SvgViewerModule,
    MaterialModule,
    RouterModule
  ],
  declarations: [HomePageComponent],
  exports: [HomePageComponent],
  providers:[ComponentPageTitle]
})
export class HomePageModule { }
