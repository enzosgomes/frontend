import { LoginService } from './../../shared/service/login.service';
import { Token } from './../../shared/model/create-user.model';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


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

  formLogin: FormGroup;

  constructor(private router: Router, private loginService: LoginService,  private fb: FormBuilder) { }

  ngOnInit(): void {

    this.formLogin = this.fb.group({
      username: [ null, [ Validators.required, Validators.minLength(4), Validators.maxLength(150) ] ],
      password: [ null, [ Validators.required, Validators.minLength(8), Validators.maxLength(150) ] ],
      // valta validação tipos de caracteres permitidos mas não consigo acessar heroku para ver
    }
    );

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
        localStorage.setItem('User', this.formLogin.value.username);
        this.getTokenAuthorization();
        this.router.navigate(['login/home']);
        //add snackbar de sucesso
      }
    }, error => {
      this.errorMessage = error.error.non_field_errors;
      //add snackbar de error
    })
  }

  getTokenAuthorization()
  {
    this.tokenAuthorization = localStorage.getItem('tokenUser');
    this.isAuthenticate = this.tokenAuthorization != null;
  }

}
