import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackToTopComponent } from './back-to-top.component';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [BackToTopComponent],
  exports:[BackToTopComponent]
})
export class BackToTopModule { }
