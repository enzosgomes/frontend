import { LoginService } from './../../shared/service/login.service';
import { Token } from './../../shared/model/create-user.model';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   isAuthenticate: boolean = false;
   tokenAuthorization: any;
   hide:boolean = true;
   checked: boolean = false;

   formLogin: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
   

  

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {

  }

  toCreateUser() 
  {
    this.router.navigate(['create-user']);
  }

  submit() 
  {
    this.loginService.login(this.formLogin.value).subscribe((data: Token) => {     
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
