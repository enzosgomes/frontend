import { CreateConsultaService } from './../../../shared/service/create-consulta.service';
import { Especialidade } from './../../../shared/model/especialidade.model';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

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

  constructor( private createConsultaService: CreateConsultaService, private fb: FormBuilder, private dialogRef: MatDialogRef<CreateConsultaComponent> ) { }

  ngOnInit(): void {
    this.formGroupCreateConsulta = this.fb.group({
      especialidade: [null, Validators.required],
      medico: [null, Validators.required],
      agenda: [null, Validators.required],
      hora: [null, Validators.required]
    });
  }

  getEspecialidades() {
    this.createConsultaService.getEspecialidades().subscribe(data => {
      this.especialidades = data.results;
    })
    this.idEspecialidade = this.formGroupCreateConsulta.value.especialidade;
  }

  getMedicos() {

    if (this.idEspecialidade != null) {
      this.createConsultaService.getMedicos(this.idEspecialidade).subscribe(data => {
        this.medicos = data.results;
      })
      this.idMedico = this.formGroupCreateConsulta.value.medico;
    } else {

      alert("selecione primeiro a especialidade");

    }

  }

  getAgendas() {

    if (this.idMedico != null && this.idEspecialidade != null) {

      this.createConsultaService.getAgendas(this.idMedico, this.idEspecialidade).subscribe(data => {
        this.agendas = data.results;
      })

      this.diaConsulta = this.formGroupCreateConsulta.value.agenda;

    } else {

      if (this.idEspecialidade == null) {
        alert("selecione primeiro a especialidade");
      }
      if (this.idMedico == null) {
        alert("selecione primeiro o medico");
      }

    }

  }


  getHora() {

    if ( this.idMedico!= null && this.idEspecialidade != null && this.diaConsulta != null ) {

      this.createConsultaService.getAgenda(this.idMedico, this.idEspecialidade, this.diaConsulta).subscribe(data => {
        this.respostaConsulta = data.results[0];
        this.agendaConsulta = JSON.stringify(this.respostaConsulta);
        this.agendaConsulta = JSON.parse(this.agendaConsulta);
        this.horarios = this.agendaConsulta.horarios;
        this.requiredPostCreateConsulta.agenda_id = this.agendaConsulta.id
      })

      this.requiredPostCreateConsulta.horario = this.formGroupCreateConsulta.value.hora;

    } else {

      if (this.idEspecialidade == null) {
        alert("selecione primeiro a especialidade");
      }
      if (this.idMedico == null) {
        alert("selecione primeiro o medico");
      }
      if (this.diaConsulta == null) {
        alert("selecione primeiro o dia");
      }

    }
  }

  marcarConsulta() {
    this.createConsultaService.postCreateConsulta(this.requiredPostCreateConsulta).subscribe(resposta => {
      console.log(resposta);
      this.dialogRef.close();
    }, error => {
      console.log(error.error.non_field_errors)
    })
    console.log(this.requiredPostCreateConsulta);
  }

  cancelar(): void {
    this.dialogRef.close();
  }

}

