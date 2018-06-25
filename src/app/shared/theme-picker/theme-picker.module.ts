import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemePickerComponent } from './theme-picker.component';
import { ThemeStorage } from './theme-storage/theme-storage';
import { StyleManager } from '../style-manager/style-manager';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [ThemePickerComponent],
  exports: [ThemePickerComponent],
  providers: [StyleManager, ThemeStorage]
})
export class ThemePickerModule { }
