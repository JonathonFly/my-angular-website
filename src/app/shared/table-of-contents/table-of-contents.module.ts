import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableOfContentsComponent } from './table-of-contents.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [TableOfContentsComponent],
  exports: [TableOfContentsComponent],
  entryComponents: [TableOfContentsComponent]
})
export class TableOfContentsModule { }
