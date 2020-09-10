import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable()
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {
  }

  showInfoMessage(text: string, duration: number = 2000) {
    this.snackBar.open(text, null, {
      duration,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: ['mdt-pr-color', 'mdt-pr-bg-color']
    });
  }

  showErrorMessage(text: string, duration: number = 4000) {
    this.snackBar.open(text, null, {
      duration,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: ['mdt-pr-color', 'mdt-pr-bg-color']
    });
  }
}
