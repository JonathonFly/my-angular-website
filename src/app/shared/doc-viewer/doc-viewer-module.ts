import {DocViewer} from './doc-viewer';
import {PortalModule} from '@angular/cdk/portal';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { MaterialModule } from '../../material/material.module';


// ExampleViewer is included in the DocViewerModule because they have a circular dependency.
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    PortalModule
  ],
  providers: [],
  declarations: [DocViewer],
  entryComponents: [],
  exports: [DocViewer],
})
export class DocViewerModule { }
