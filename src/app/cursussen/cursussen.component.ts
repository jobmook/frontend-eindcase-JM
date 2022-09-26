import { formatDate, JsonPipe } from '@angular/common';
import { DEFAULT_INTERPOLATION_CONFIG } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CURSUSSEN } from '../mock-cursussen';
import { createCursus, Cursus } from '../models/cursus'

@Component({
  selector: 'app-cursussen',
  templateUrl: './cursussen.component.html',
  styleUrls: ['./cursussen.component.css']
})
export class CursussenComponent implements OnInit {
  cursussen : Cursus[] = []; // refactor.
  isLoading = true;

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
        newCursus.Startdatum = datumDate;
        this.cursussen.push(newCursus)
      }
    }
    this.cursussen.sort((a,b) => a.Startdatum.valueOf() - b.Startdatum.valueOf());
    this.isLoading = false;
  })
}

constructor() { }

  ngOnInit(): void {
    this.objectenUitlezen();
  };
}  
