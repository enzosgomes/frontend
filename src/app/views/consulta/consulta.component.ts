import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  testeok: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ToCreateConsulta(){
    this.testeok = true;
  }

}
