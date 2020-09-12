import { Injectable } from '@angular/core';

import { ITokenData } from '@api/models/token-data.model';

import { Themes } from '@shared/enums/themes';


@Injectable()
export class LocalStorageService {
  constructor() {
  }

  // token actions
  getToken(): string {
    const expiresIn = localStorage.getItem('expiresIn');
    const expDate = new Date(expiresIn);
    const currentDate = new Date();
    if (currentDate > expDate) {
      return null;
    }
    return localStorage.getItem('token');
  }

  setToken(tokenData: ITokenData): void {
    if (tokenData !== null) {
      localStorage.setItem('token', tokenData.token);
      localStorage.setItem('expiresIn', tokenData.expiresIn);
    } else {
      this.clearTokenData();
    }
  }

  clearTokenData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
  }

  // theme actions
  getTheme(): Themes {
    return localStorage.getItem('theme') as Themes || Themes.LIGHT_DEFAULT;
  }

  setTheme(theme: Themes): void {
    localStorage.setItem('theme', theme);
  }
}
