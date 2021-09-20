import { User } from './../model/create-user.model';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {
  private readonly urlUser = environment["urlUser"];
  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<User>
  {
    return this.http.post<User>(this.urlUser, user)
  }

}
