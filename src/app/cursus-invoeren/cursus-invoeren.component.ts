import { JsonPipe } from '@angular/common';
import { outputAst } from '@angular/compiler';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { createCursus } from '../models/cursus';

@Component({
  selector: 'app-cursus-invoeren',
  templateUrl: './cursus-invoeren.component.html',
  styleUrls: ['./cursus-invoeren.component.css']
})
export class CursusInvoerenComponent implements OnInit {
  fileEntity!: File;
  fileContents! : string;
  fileName!: string;
  aantalCursussenToegevoegd: number = 0;
  aantalCursusInstantiesToegevoegd: number = 0;
  aantalDuplicaten: number = 0;
  foutRegel = 0;
  correctFormaat: boolean = true;
  startdatum: string = '';
  einddatum: string = '';
  
  @Output()
  postRequestEvent = new EventEmitter<boolean>();

  postRequest(value: boolean){
    this.postRequestEvent.emit(value);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log(file.name);
    console.log(file.type);
    if(file.type != 'text/plain'){
      this.correctFormaat = false;
    } else {
      this.correctFormaat = true;
    }
    this.fileEntity = file;
  }
  
  objectenSturen(cursusLijst: {}[]){
    fetch('https://localhost:7183/api/cursus', {
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(cursusLijst)
    })
    .then((response) => response.json())
    .then((data) => {
    console.log('Success:', data);
    this.aantalCursusInstantiesToegevoegd = data.cursusInstantieToevoeging;
    this.aantalCursussenToegevoegd = data.cursusToevoeging;
    this.aantalDuplicaten = data.duplicaten;
    this.postRequest(true);
    })
    .catch((error) => {
      console.error('Error:', error);
    });  
  }
  
  fileValidation (readfileContents: string){
    let cursusLijst: {}[] = [];
    let nieuweCursus = createCursus();

    let counter = 0;
    let lines: string[] = readfileContents.split('\n');
    lines.pop();
    for (let index = 0; index < lines.length; index++) {
      const currentLine = lines[index];
      switch (counter) {
        case 0:
          const foundTitel = currentLine.match(/Titel: (.*)$/);
          if (foundTitel == null) {
            this.foutRegel =  index;
            return;
          }
          nieuweCursus.Titel = foundTitel[1];
          break;
  
        case 1:
          const foundCursuscode = currentLine.match(/Cursuscode: (.*)$/);
          if (foundCursuscode == null) {
            this.foutRegel =  index;
            return;
          }
          nieuweCursus.Cursuscode = foundCursuscode[1];
          break;
  
        case 2:
          const foundDuur = currentLine.match(/Duur: (\d+) dagen$/);
          if (foundDuur == null) {
            this.foutRegel =  index;
            return;
          }
          nieuweCursus.Duur = +foundDuur[1];
          break;
  
        case 3:
          const foundStartdatum = currentLine.match(/Startdatum: (\d\d?\/\d\d?\/\d\d\d\d)$/);
          if (foundStartdatum == null) {
            this.foutRegel =  index;
            return;
          }
          nieuweCursus.Startdatum = moment(foundStartdatum[1], 'DD/MM/YYYY').toDate();
          break;
  
        case 4:
          const foundLinebreak = currentLine.match(/^$/gm);
          if (foundLinebreak == null) {
            this.foutRegel =  index;
            return;
          }
          break;
      
        default:
          break;
      }
      if(counter == 4) {
        if((nieuweCursus.Startdatum <= new Date(this.einddatum) && nieuweCursus.Startdatum >= new Date(this.startdatum))) cursusLijst.push(nieuweCursus);
        counter = 0;
        nieuweCursus = createCursus();
      }
      else counter++; 
    }
    if(cursusLijst.length == 0) throw Error;
    return cursusLijst;
  }
  
  readFile(){
    this.aantalCursussenToegevoegd = 0;
    this.aantalCursusInstantiesToegevoegd = 0;
    this.aantalDuplicaten= 0;
    this.correctFormaat = true;
    this.foutRegel = 0;
    let fileReader = new FileReader();
    fileReader.onload = () => {
    console.log(fileReader.result); // file lezen
    this.fileContents =  fileReader.result as string;
    let lijst : {}[]= this.fileValidation(this.fileContents)!;
    this.objectenSturen(lijst);
  }
    fileReader.readAsText(this.fileEntity);
  };

constructor() { }

ngOnInit(): void {

}

}
