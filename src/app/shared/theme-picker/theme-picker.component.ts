import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { ThemeStorage, DocsSiteTheme } from './theme-storage/theme-storage';
import { StyleManager } from '../style-manager/style-manager';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ThemePickerComponent implements OnInit {

  currentTheme;

  themes = [
    {
      primary: '#827717',
      accent: '#b71c1c',
      href: 'lime-red.css',
      isDark: false,
      isDefault: true
    },
    {
      primary: '#e65100',
      accent: '#1976D2',
      href: 'orange-blue.css',
      isDark: true
    },
    {
      primary: '#673AB7',
      accent: '#FFC107',
      href: 'deeppurple-amber.css',
      isDark: false
    },
    {
      primary: '#E91E63',
      accent: '#607D8B',
      href: 'pink-bluegrey.css',
      isDark: true
    },
    {
      primary: '#3F51B5',
      accent: '#E91E63',
      href: 'indigo-pink.css',
      isDark: false
    },
    {
      primary: '#9C27B0',
      accent: '#4CAF50',
      href: 'purple-green.css',
      isDark: true
    }
  ];

  constructor(
    public styleManager: StyleManager,
    private _themeStorage: ThemeStorage
  ) {
    const currentTheme = this._themeStorage.getStoredTheme();
    if (currentTheme) {
      this.installTheme(currentTheme);
    }
  }

  ngOnInit(): void {

  }

  installTheme(theme: DocsSiteTheme) {
    this.currentTheme = this._getCurrentThemeFromHref(theme.href);

    if (theme.isDefault) {
      this.styleManager.removeStyle('theme');
    } else {
      this.styleManager.setStyle('theme', `assets/${theme.href}`);
    }

    if (this.currentTheme) {
      this._themeStorage.storeTheme(this.currentTheme);
    }
  }

  private _getCurrentThemeFromHref(href: string): DocsSiteTheme {
    return this.themes.find(theme => theme.href === href);
  }

}
