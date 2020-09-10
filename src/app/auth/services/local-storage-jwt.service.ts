import { Injectable } from '@angular/core';

import { ITokenData } from '@api/models/token-data.model';


@Injectable()
export class LocalStorageJwtService {
  constructor() {
  }

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
      localStorage.clear();
    }
  }

  clearToken(): void {
    localStorage.clear();
  }
}
