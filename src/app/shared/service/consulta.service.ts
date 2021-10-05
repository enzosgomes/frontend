import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
 // private readonly urlConsulta = environment["urlConsulta"];

  constructor( private http: HttpClient ) { }


  getConsulta(): Observable<any> {
    return this.http.get<any>( environment["baseUrl"] + "/consultas/" );
  }
  
}
