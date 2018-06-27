import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { MatButtonModule } from '@angular/material';
import { SvgViewerModule } from '../shared/svg-viewer/svg-viewer';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    SvgViewerModule,
    MatButtonModule,
    RouterModule
  ],
  declarations: [HomePageComponent],
  exports: [HomePageComponent]
})
export class HomePageModule { }
