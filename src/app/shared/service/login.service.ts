import { User, Token } from './../model/create-user.model';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly urlLogin = environment["urlLogin"];
  token: any;

  constructor(private http: HttpClient) { }

  login(login: User): Observable<Token>
  {
    return this.token = this.http.post<Token>(this.urlLogin, login);
  }

}