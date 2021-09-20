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

  idEspecialidade: Number;

  idMedico: Number;

  dia: String;


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
    this.dia =  this.formGroupCreateConsulta.value.data;
  }

  getHora()
  {

  }

  onCountryChanged(value: any) {
    console.log('[onCountryChanged]')
    console.log(value)
  }

  submit() {/*
    console.log('ESPECIALIDADE: ', this.formGroupCreateConsulta.value.especialidade);
    console.log('MEDICO: ', this.formGroupCreateConsulta.value.medico);
    console.log('AGENDA: ', this.formGroupCreateConsulta.value.agenda);*/
    //   GET /agendas/?medico=1&especialidade=2&data_inicio=2020-01-01&data_final=2020-01-05
    console.log('DIA: ', this.formGroupCreateConsulta.value.agenda);
  }


}

