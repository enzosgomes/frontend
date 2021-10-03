import { User } from './../../shared/model/create-user.model';
import { CreateUserService } from './../../shared/service/create-user.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  formCreateUser: FormGroup = new FormGroup({
    username: new FormControl( '', [Validators.required] ),
    email: new FormControl( '', [Validators.required, Validators.email] ),
    password: new FormControl( '', [Validators.required] ),
    validPassword: new FormControl( '', [Validators.required] )
  });

  hide:boolean = true;
  
  hideValid:boolean = true;

  validPassword: String;

  userResponse: User;

  constructor(private router: Router, private createUserServise: CreateUserService) { }

  ngOnInit(): void {
  }

  createUser(): void 
  {
    if(this.formCreateUser.value.validPassword == this.formCreateUser.value.password)
    {
      this.createUserServise.createUser(this.formCreateUser.value).subscribe(userResponse => {
        this.userResponse = userResponse;
        this.router.navigate(['']);
        }, error => {
          console.log(error.error.non_field_errors);
          alert('dados invalidos');
        })
    } else {
      alert('Confirmação de senha invalida.');
    }
  }
  
   cancel(): void 
   {
     this.router.navigate(['']);
   }

}
