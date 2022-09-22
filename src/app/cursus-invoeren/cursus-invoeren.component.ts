import { JsonPipe } from '@angular/common';
import { outputAst } from '@angular/compiler';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CursusService } from '../cursus.service';

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

onFileSelected(event: any) {
  const file: File = event.target.files[0];
  console.log(file.name);
  this.fileEntity = file;
}

readFile(){
   let fileReader = new FileReader();
   fileReader.onload = () => {
    console.log(fileReader.result); // read entire file
    this.fileContents =  fileReader.result as string;

    let lines: string[] = this.fileContents.split('\n\n');
    lines.pop(); // verwijdert laatste lege array.
    let cursusLijst: {}[] = [];
    
    
    console.log(lines[0]);
    lines.forEach(element => {
      let cursusBlok = element.split('\n');
      let newCursus : { Titel:string, Cursuscode:string, Duur:number, Startdatum: string} = {Titel:'', Cursuscode:'', Duur:0, Startdatum:'' };
      cursusBlok.forEach(line => {
        if(line.startsWith('Titel')){
          newCursus.Titel = line.substring(7);
        } else if(line.startsWith('Cursuscode')){
          newCursus.Cursuscode = line.substring(12);
        } else if(line.startsWith('Duur')){
          newCursus.Duur = +line.substring(6,7);
        } else if(line.startsWith('Startdatum')){
          newCursus.Startdatum = line.substring(12)
        } else {
          console.log('Cannot read line.');
        }
      });
      cursusLijst.push(newCursus);
    });
    console.log('Cursuslijst lengte: ' + cursusLijst.length)
    cursusLijst.forEach(cursus => {
      console.log(cursus);
    });

    // cursusLijst.forEach(cursus => {
    //   fetch('https://localhost:7183/api/cursus', {
    //     method: 'POST',
    //     headers:{
    //       'Content-Type':'application/json'
    //     },
    //     body: JSON.stringify(cursus)
    //   })
    //   //.then((response) => response.json())
    //   .then((data) => {
    //   console.log('Success:', data);
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });
    // });

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
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  fileReader.readAsText(this.fileEntity);
}

constructor() { }

ngOnInit(): void {

}

}
