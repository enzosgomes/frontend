import { ConsultaService } from './../../shared/service/consulta.service';

import { CreateConsultaComponent } from './create-consulta/create-consulta.component';

import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  consultas: any[];

  displayedColumns: string[] = ['especialidade', 'profissional', 'data', 'hora', 'delete-consulta'];
  
  constructor( private consultaService: ConsultaService, private dialog: MatDialog) { }

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
      //tratas as respontas de erros 
    })
  }

  deleteConsulta(id: any) {
    this.consultaService.deleteConsulta(id).subscribe( response => {
      //tratas as respontas de erros 
    })
  }


}
