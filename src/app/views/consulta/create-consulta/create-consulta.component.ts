import { CreateConsultaService } from './../../../shared/service/create-consulta.service';
import { Especialidade } from './../../../shared/model/especialidade.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-consulta',
  templateUrl: './create-consulta.component.html',
  styleUrls: ['./create-consulta.component.css']
})
export class CreateConsultaComponent implements OnInit {

  formGroupCreateConsulta: FormGroup;

  especialidades: Especialidade[];

  medicos: any[];

  agendas: any[];

  horarios: any[];

  agendaConsulta: any;

  //para o post crear consulta
  
  idEspecialidade: Number;

  idMedico: Number;

  idAgenda: any;

  diaConsulta: String;

  horaConsulta: String;

  respostaConsulta: any[];

  requiredPostCreateConsulta: any = {
    agenda_id: 0,
    horario: ''
  }

  
  constructor(private createConsultaService: CreateConsultaService, private fb: FormBuilder) { }

  ngOnInit(): void 
  {
    
    this.formGroupCreateConsulta = this.fb.group({
      especialidade: [null],
      medico: [null],
      agenda: [null],
      hora: [null]
    });

    this.formGroupCreateConsulta.get("especialidade")?.valueChanges.subscribe(esp => {
      this.onCountryChanged(esp);
    })

    this.formGroupCreateConsulta.get("medico")?.valueChanges.subscribe(esp => {
      this.onCountryChanged(esp);
    })

    this.formGroupCreateConsulta.get("agenda")?.valueChanges.subscribe(esp => {
      this.onCountryChanged(esp);
    })

    this.formGroupCreateConsulta.get("hora")?.valueChanges.subscribe(esp => {
      this.onCountryChanged(esp);
    })

  }

  getEspecialidades()
  {
    this.createConsultaService.getEspecialidades().subscribe(data => {
      this.especialidades = data.results;
    })
    this.idEspecialidade =  this.formGroupCreateConsulta.value.especialidade;
  }

  getMedicos()
  {
    this.createConsultaService.getMedicos(this.idEspecialidade).subscribe(data => {
      this.medicos = data.results;
    })
    this.idMedico =  this.formGroupCreateConsulta.value.medico;
  }

  getAgendas()
  {
    this.createConsultaService.getAgendas(this.idMedico, this.idEspecialidade).subscribe(data => {
      this.agendas = data.results;
    })
   this.diaConsulta = this.formGroupCreateConsulta.value.agenda;
  }


  getHora()
  {
    this.createConsultaService.getAgenda(this.idMedico, this.idEspecialidade, this.diaConsulta).subscribe(data => {
      this.respostaConsulta = data.results[0];
      this.agendaConsulta = JSON.stringify(this.respostaConsulta);
      this.agendaConsulta = JSON.parse(this.agendaConsulta);
      this.horarios = this.agendaConsulta.horarios;
      this.requiredPostCreateConsulta.agenda_id = this.agendaConsulta.id
    })
   this.requiredPostCreateConsulta.horario = this.formGroupCreateConsulta.value.hora;
  }

  marcarConsulta() {
    this.createConsultaService.postCreateConsulta(this.requiredPostCreateConsulta).subscribe(resposta => {
      console.log(resposta);
    }, error => {
      console.log(error.error.non_field_errors)
    })
  }


  onCountryChanged(value: any) {
    console.log('[onCountryChanged]')
    console.log(value)
  }

  submit() {
    this.marcarConsulta();
  }

}

