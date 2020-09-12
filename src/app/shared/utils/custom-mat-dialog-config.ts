import { MatDialogConfig } from '@angular/material/dialog';


export class CustomMatDialogConfig {
  static getConfirmDialogConfig(data: any): MatDialogConfig {
    return { panelClass: ['mdt-pr-color', 'mdt-pr-bg-color', 'confirm-dialog'], data };
  }
}
