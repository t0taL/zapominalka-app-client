import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';

import { LocalStorageService } from './local-storage.service';

import { Themes } from '@shared/enums/themes';

import { getThemeColor } from '@shared/utils/themes-mappers';


@Injectable()
export class ThemesService {
  renderer: Renderer2;
  themes$: Observable<{ oldValue: Themes, newValue: Themes }>;

  constructor(
    private localStorageService: LocalStorageService,
    private meta: Meta,
    rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.initTheme();
  }

  private initTheme(): void {
    const theme: Themes = this.localStorageService.getTheme();

    this.applyTheme(null, theme);
  }

  private applyTheme(oldValue: Themes, newValue: Themes): void {
    if (oldValue !== null) {
      this.renderer.removeClass(this.document.body, oldValue);
    }
    this.renderer.addClass(this.document.body, newValue);
    this.meta.updateTag({ name: 'theme-color', content: getThemeColor(newValue) }, 'name=theme-color');
  }

  initService(): Promise<boolean> {
    return new Promise((resolve) => {
      resolve(true);
    });
  }

  changeTheme(theme: Themes): void {
    const oldValue: Themes = this.localStorageService.getTheme();
    const newValue: Themes = theme;

    if (oldValue !== newValue) {
      this.applyTheme(oldValue, newValue);
    }

    this.localStorageService.setTheme(theme);
  }
}
