import { ConsultaService } from 'src/app/shared/service/consulta.service';
import { CreateConsultaComponent } from './create-consulta/create-consulta.component';
import { MessageSnackbarService } from 'src/app/shared/service/message-snackbar.service';

import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  consultas: any[];

  errorMessage: string;

  displayedColumns: string[] = ['especialidade', 'profissional', 'data', 'hora', 'delete-consulta'];
  
  constructor( private consultaService: ConsultaService, private dialog: MatDialog, private messageSnackbarService: MessageSnackbarService) { }

  ngOnInit(): void {
    
    this.listConsultas();

  }

  addConsulta(): void {
    const dialogRef = this.dialog.open(CreateConsultaComponent, {
      width: '480px',
      height: '420px',
    });
  }
  
  listConsultas() {
    this.consultaService.getConsulta().subscribe( consultas => {
      this.consultas = consultas.results;
    })
  }

  deleteConsulta(id: any) {
    this.consultaService.deleteConsulta(id).subscribe( () => {
      this.messageSnackbarService.showSuccess("Consulta deletada!");
    }, error => {
      this.errorMessage = error.error.non_field_errors;
      this.messageSnackbarService.showError(this.errorMessage);
    })
  }

}
