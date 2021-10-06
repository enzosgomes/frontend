import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageSnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  showError(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['show-error'];
    config.duration = 5000;
    this.snackBar.open(message, '', config);
 }


 showSuccess(message: string) {
  const config = new MatSnackBarConfig();
  config.panelClass = ['show-succes'];
  config.duration = 5000;
  this.snackBar.open(message, '', config);
}

}

