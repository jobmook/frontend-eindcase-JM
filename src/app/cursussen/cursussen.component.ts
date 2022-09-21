import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CURSUSSEN } from '../mock-cursussen';

@Component({
  selector: 'app-cursussen',
  templateUrl: './cursussen.component.html',
  styleUrls: ['./cursussen.component.css']
})
export class CursussenComponent implements OnInit {

  cursussen : {Titel: string, Cursuscode:string, Duur:number, Startdatum: string }[] = []; // refactor.

  constructor() { }

  ngOnInit(): void {
    fetch('https://localhost:7183/api/cursus')
    .then(response => response.json())
    .then(data => {
      for (const cursus of data) {
        let newCursus : { Titel:string, Cursuscode:string, Duur:number, Startdatum: string} = {Titel:'', Cursuscode:'', Duur:0, Startdatum:'' };
        for (let index = 0; index < cursus.cursusInstanties.length; index++) {
          newCursus.Titel = cursus.titel;
          newCursus.Duur = cursus.duur;
          newCursus.Cursuscode = cursus.code;
          newCursus.Startdatum = cursus.cursusInstanties[index].startdatum; // refactor op daadwerkelijke datum
          this.cursussen.push(newCursus)
        }
      }
    })
  }
  }
