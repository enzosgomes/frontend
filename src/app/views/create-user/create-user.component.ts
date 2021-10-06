
import { User } from 'src/app/shared/model/create-user.model';
import { CreateUserService } from 'src/app/shared/service/create-user.service';
import { MyErrorStateMatcher, passwordValidator } from 'src/app/shared/defalt-errors/password.validator';
import { MessageSnackbarService } from 'src/app/shared/service/message-snackbar.service';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  formCreateUser: FormGroup;
  
  hide:boolean = true;

  hideValid:boolean = true;

  userResponse: User;

  errorMessageUser: string = "";

  showPasswordconfirmedError: boolean = false;

  matcher = new MyErrorStateMatcher();
  
  constructor( private router: Router, private createUserServise: CreateUserService, private fb: FormBuilder, private messageSnackbarService: MessageSnackbarService) { }

  ngOnInit(): void {

    this.formCreateUser = this.fb.group({
      username: [ null, [ Validators.required, Validators.minLength(4), Validators.maxLength(150) ] ],
      email: [ null, [ Validators.required, Validators.email, Validators.maxLength(150) ] ],
      password: [ null, [ Validators.required, Validators.minLength(8), Validators.maxLength(150) ] ],
      validPassword: [ null, Validators.required ],
    }, { validators: [passwordValidator] }
    );

  }

  createUser() 
  {
        this.createUserServise.createUser(this.formCreateUser.value).subscribe(userResponse => {
        this.userResponse = userResponse;
        this.messageSnackbarService.showSuccess("Conta criada com sucesso!")
        this.router.navigate(['']);
        }, serverError => {
          this.errorMessageUser = serverError.error.non_field_errors;
          this.messageSnackbarService.showError(this.errorMessageUser);
        })
  }
   cancel() 
   {
     this.router.navigate(['']);
   }

}
