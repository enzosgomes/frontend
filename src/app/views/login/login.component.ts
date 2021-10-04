import { LoginService } from './../../shared/service/login.service';
import { Token } from './../../shared/model/create-user.model';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isAuthenticate: boolean = false;
  tokenAuthorization: any;
  hide: boolean = true;
  errorMessage: string = "";

  formLogin: FormGroup = new FormGroup({
    username: new FormControl( [null], [Validators.required] ),
    password: new FormControl( [null], [Validators.required] ),
  });
   
  constructor(private router: Router, private loginService: LoginService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

  }

  openSnackBar(message: string) 
  {
    this._snackBar.open(message, '', {duration: 3000, verticalPosition: 'top'});
  }
  
  toCreateUser() 
  {
    this.router.navigate(['create-user']);
  }

  submitLogin()
  {
    this.loginService.login(this.formLogin.value).subscribe((data: Token) => {     
      if(data)
      {
        localStorage.setItem('tokenUser', data.token);
        this.getTokenAuthorization();
        this.router.navigate(['login/home']);
      }
    }, error => {
      this.errorMessage = error.error.non_field_errors;
      this.openSnackBar(this.errorMessage);
    })
  }

  getTokenAuthorization()
  {
    this.tokenAuthorization = localStorage.getItem('tokenUser');
    this.isAuthenticate = this.tokenAuthorization != null;
    return this.isAuthenticate;
  }

}
