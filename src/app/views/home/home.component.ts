import { LoginComponent } from './../login/login.component';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isAuthenticateHome: boolean = false;
  getAutorization: any;

  user: any;

  constructor(private loginComponent: LoginComponent, private router: Router) { }

  ngOnInit(): void 
  {
    this.user = localStorage.getItem('User');
    this.AuthenticateHome();
  }

  AuthenticateHome() 
  {
    this.getAutorization = this.loginComponent.getTokenAuthorization();
    this.isAuthenticateHome = this.loginComponent.isAuthenticate;
  }

  logout() 
  {
    localStorage.removeItem('tokenUser');
    localStorage.removeItem('User');
    this.router.navigate(['']);
  }

}
