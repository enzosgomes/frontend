import { LoginService } from './../../shared/service/login.service';
import { User, Token } from './../../shared/model/create-user.model';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: User = {
    username: '',
    email: '',
    password: ''
   };

   isAuthenticate: boolean = false;
   tokenAuthorization: any;

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  toCreateUser(): void 
  {
    this.router.navigate(['create-user']);
  }

  authenticate(): void 
  {
    this.loginService.login(this.login).subscribe((data: Token)=> {     
      if(data)
      {
        localStorage.setItem('tokenUser', data.token);
        this.getTokenAuthorization();
        this.router.navigate(['login/home']);
      } else 
      {
        console.log('Noelse', data);
      }

    }, error => {
      alert(error.error.non_field_errors);
    })
  }

  getTokenAuthorization()
  {
    this.tokenAuthorization = localStorage.getItem('tokenUser');
    this.isAuthenticate = this.tokenAuthorization != null;
  }

}
