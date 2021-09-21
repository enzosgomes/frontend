import { ResponseEspecialidades } from './../model/response-list-especialidades.model';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateConsultaService {

  private readonly urlEspecialidades = environment["urlEspecialidade"];
  private readonly urlMedicos = environment["urlMedicos"];
  private readonly urlAgendas = environment["urlAgendas"];
  private readonly urlConsulta = environment["urlConsulta"];

  constructor(private http: HttpClient) { }

  getEspecialidades(): Observable<ResponseEspecialidades> 
  {
    return this.http.get<ResponseEspecialidades>(this.urlEspecialidades);
  }

  getMedicos(especialidade: Number): Observable<ResponseEspecialidades> 
  {
    return this.http.get<ResponseEspecialidades>(this.urlMedicos + '?especialidade=' + especialidade);
  }

  getAgendas(medico: Number, especialidade: Number): Observable<any> 
  {
    return this.http.get<ResponseEspecialidades>(this.urlAgendas + '?medico=' + medico + '&especialidade=' + especialidade);
  }

  getAgenda(medico: Number, especialidade: Number, data: String): Observable<any>
  {
    return this.http.get<ResponseEspecialidades>(this.urlAgendas + '?medico=' + medico + '&especialidade=' + especialidade + '&data_inicio=' + data + '&data_final=' + data);
  }

  postCreateConsulta(consulta: any): Observable<any>{
    return this.http.post(this.urlConsulta, consulta);
  }

}