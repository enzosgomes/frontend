import { FormControl, FormGroupDirective, NgForm, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


export function passwordValidator(
  control: AbstractControl
): {
  [key: string]: boolean;
} | null {


  const password = control.get("password");
  const validPassword = control.get("validPassword");
  if (password!.pristine || validPassword!.pristine) {
    return null;
  }
  return password && validPassword && password.value !== validPassword.value
    ? { paswordMismatch: true }
    : null;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const invalidCtrl = !!(control && control.invalid && control.parent?.dirty);
      const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
  
      return (invalidCtrl || invalidParent);
    }
  }