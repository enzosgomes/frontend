import { User } from './../../shared/model/create-user.model';
import { CreateUserService } from './../../shared/service/create-user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  
  user: User = {
    username: '',
    email: '',
    password: ''
  }

  validPassword: String;

  userResponse: User;

  constructor(private router: Router, private createUserServise: CreateUserService) { }

  ngOnInit(): void {
  }

  createUser(): void 
  {
    if(this.validPassword == this.user.password)
    {
      this.createUserServise.createUser(this.user).subscribe(userResponse => {
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
