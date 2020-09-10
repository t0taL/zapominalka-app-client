import { FormControl } from '@angular/forms';


export class CustomValidators {
  private static _password = '';

  constructor() {
  }

  static password(control: FormControl): { [key: string]: boolean } {
    const value = control.value;
    CustomValidators._password = value;
    if (value !== null) {
      if (value.length < 6) {
        return({ shortPassword: true });
      } else if (value.length > 50) {
        return({ longPassword: true });
      } else if (value.search(/\d/) === -1) {
        return({ withoutNumberPassword: true });
      } else if (value.search(/[a-zA-Z]/) === -1) {
        return({ withoutLetterPassword: true });
      } else if (value.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) !== -1) {
        return({ incorrectCharPassword: true });
      }
    }
    return null;
  }

  static confirmPassword(control: FormControl): { [key: string]: boolean } {
    const value = control.value;
    if (value !== CustomValidators._password) {
      return { notMatchingPassword: true };
    }
    return null;
  }

  static email(control: FormControl): { [key: string]: boolean } {
    const value = control.value;
    if (!value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) && value !== '') {
      return { incorrectEmailFormat: true };
    }
    return null;
  }
}
