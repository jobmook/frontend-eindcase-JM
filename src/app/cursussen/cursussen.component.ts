import { formatDate, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CURSUSSEN } from '../mock-cursussen';
import { createCursus, Cursus } from '../models/cursus'

@Component({
  selector: 'app-cursussen',
  templateUrl: './cursussen.component.html',
  styleUrls: ['./cursussen.component.css']
})
export class CursussenComponent implements OnInit {
  cursussen : Cursus[] = []; // refactor.
  // cursusLijst : {Titel: string, Cursuscode:string, Duur:number, Startdatum: string }[] = []; // refactor.

resetLijst(){
  fetch('https://localhost:7183/api/cursus/remove-all-entries')
  .then(response => response)
  .then((data) => {
    console.log(data);
    this.objectenUitlezen();
  }
 );
}

haalItemsOp(value: boolean){
  if(value) this.objectenUitlezen();
}

objectenUitlezen(){
  fetch('https://localhost:7183/api/cursus')
  .then(response => response.json())
  .then(data => {
    this.cursussen = [];
    for (let cursus of data) {
      for (let index = 0; index < cursus.cursusInstanties.length; index++) {
        let newCursus = createCursus();
        newCursus.Titel = cursus.titel;
        newCursus.Duur = cursus.duur;
        newCursus.Cursuscode = cursus.code;
        const datum = cursus.cursusInstanties[index].startdatum;
        let datumDate = new Date(datum);
        newCursus.Startdatum = datumDate
        console.log(newCursus.Startdatum);
        this.cursussen.push(newCursus)
      }
    }
    this.cursussen.sort((a,b) => a.Startdatum.valueOf() - b.Startdatum.valueOf())
  })
}

constructor() { }

  ngOnInit(): void {
    this.objectenUitlezen();
  };


  ngOnChange(){
  }
}  
