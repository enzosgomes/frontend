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
  testeUI: any;

  constructor(private loginComponent: LoginComponent, private router: Router) { }

  ngOnInit(): void 
  {
    this.AuthenticateHome();
  }

  AuthenticateHome() 
  {
    this.testeUI = this.loginComponent.getTokenAuthorization();
    this.isAuthenticateHome = this.loginComponent.isAuthenticate;
  }

  logout() 
  {
    localStorage.removeItem('tokenUser');
    this.router.navigate(['']);
  }

}
