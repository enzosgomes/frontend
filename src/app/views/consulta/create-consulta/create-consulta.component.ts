import { CreateConsultaService } from 'src/app/shared/service/create-consulta.service';
import { Especialidade } from 'src/app/shared/model/especialidade.model';
import { MessageSnackbarService } from 'src/app/shared/service/message-snackbar.service';

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

  showErrorMedico: boolean = false;
  showErrorDia: boolean = false;
  showErrorHora: boolean = false;

  errorMessage:string;

  constructor( private createConsultaService: CreateConsultaService, private fb: FormBuilder, private dialogRef: MatDialogRef<CreateConsultaComponent>,  private messageSnackbarService: MessageSnackbarService ) { }

  ngOnInit(): void {
    this.formGroupCreateConsulta = this.fb.group({
      especialidade: [null, Validators.required],
      medico: [null, Validators.required],
      agenda: [null, Validators.required],
      hora: [null, Validators.required]
    });

    this.getEspecialidades();
  }

  getEspecialidades() {
    this.createConsultaService.getEspecialidades().subscribe(data => {
      this.especialidades = data.results;
    })
  }

  getMedicos() {
    this.showErrorMedico = false;
    this.showErrorDia = false;

    this.idEspecialidade = this.formGroupCreateConsulta.value.especialidade;
    if (this.idEspecialidade != null) {
      this.createConsultaService.getMedicos(this.idEspecialidade).subscribe(data => {
        this.medicos = data.results;
      })
      this.idMedico = this.formGroupCreateConsulta.value.medico;
    } else {

      this.showErrorMedico = true;

    }

  }

  getAgendas() {
    this.showErrorHora = false;

    if (this.idMedico != null && this.idEspecialidade != null) {

      this.createConsultaService.getAgendas(this.idMedico, this.idEspecialidade).subscribe(data => {
        this.agendas = data.results;
      })
      this.diaConsulta = this.formGroupCreateConsulta.value.agenda;

    } else {
      this.showErrorDia = true;
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
      this.showErrorHora = true;
    }
  }

  marcarConsulta() {
    this.createConsultaService.postCreateConsulta(this.requiredPostCreateConsulta).subscribe( () => {
      this.messageSnackbarService.showSuccess("Consulta marcada.");
      this.dialogRef.close();
      this.formGroupCreateConsulta.reset();
      window.location.reload();
    }, error => {
      this.errorMessage = error.error.non_field_errors;
      this.messageSnackbarService.showError(this.errorMessage);
    })
  }

  cancel(): void {
    this.dialogRef.close();
  }

}

