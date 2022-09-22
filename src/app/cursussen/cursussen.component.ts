import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CURSUSSEN } from '../mock-cursussen';
import { CursusService } from '../cursus.service';
import { createCursus } from '../models/cursus'

@Component({
  selector: 'app-cursussen',
  templateUrl: './cursussen.component.html',
  styleUrls: ['./cursussen.component.css']
})
export class CursussenComponent implements OnInit {

  cursussen : {Titel: string, Cursuscode:string, Duur:number, Startdatum: string }[] = []; // refactor.
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
        var datum = cursus.cursusInstanties[index].startdatum;
        newCursus.Startdatum =  datum.substring(8,10) + '/' + datum.substring(5,7)   + '/' + datum.substring(0,4);
        console.log(newCursus.Startdatum);
        this.cursussen.push(newCursus)
      }
    }
  })
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
      // let nieuweCursus : { Titel:string, Cursuscode:string, Duur:number, Startdatum: string} = {Titel:'', Cursuscode:'', Duur:0, Startdatum:'' };
      let nieuweCursus = createCursus();
      cursusBlok.forEach(line => {
        if(line.startsWith('Titel')){
          nieuweCursus.Titel = line.substring(7);
        } else if(line.startsWith('Cursuscode')){
          nieuweCursus.Cursuscode = line.substring(12);
        } else if(line.startsWith('Duur')){
          nieuweCursus.Duur = +line.substring(6,7);
        } else if(line.startsWith('Startdatum')){
          nieuweCursus.Startdatum = line.substring(12)
        } else {
          console.log('Cannot read line.');
        }
      });
      cursusLijst.push(nieuweCursus);
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
      }).then(() => this.objectenUitlezen())
      .catch((error) => {
        console.error('Error:', error);
      });  
  }
  fileReader.readAsText(this.fileEntity);
}

  constructor(private cursusService: CursusService) { }

  ngOnInit(): void {
    // fetch('https://localhost:7183/api/cursus')
    // .then(response => response.json())
    // .then(data => {
    //   for (let cursus of data) {
    //     let newCursus : { Titel:string, Cursuscode:string, Duur:number, Startdatum: string} = {Titel:'', Cursuscode:'', Duur:0, Startdatum:'' };
    //     for (let index = 0; index < cursus.cursusInstanties.length; index++) {
    //       newCursus.Titel = cursus.titel;
    //       newCursus.Duur = cursus.duur;
    //       newCursus.Cursuscode = cursus.code;
    //       // newCursus.Startdatum = cursus.cursusInstanties[index].startdatum; // refactor op daadwerkelijke datum
    //       const datum : string = cursus.cursusInstanties[index].startdatum;
    //       newCursus.Startdatum =  datum.substring(8,10) + '/' + datum.substring(5,7)   + '/' + datum.substring(0,4);
    //       console.log(newCursus.Startdatum);
    //       this.cursussen.push(newCursus)
    //     }
    //   }
    //   console.log('Cursussen lengte: ' + this.cursussen.length);
    //   this.cursussen.forEach(element => {
    //     console.log(element)
    //   });
    //   this.cursussen.forEach(cursus => {
    //     console.log(cursus.Startdatum);
    //   });
    // })
    this.objectenUitlezen();
  };


  ngOnChange(){
    // fetch('https://localhost:7183/api/cursus')
    // .then(response => response.json())
    // .then(data => {
    //   for (const cursus of data) {
    //     let newCursus : { Titel:string, Cursuscode:string, Duur:number, Startdatum: string} = {Titel:'', Cursuscode:'', Duur:0, Startdatum:'' };
    //     for (let index = 0; index < cursus.cursusInstanties.length; index++) {
    //       newCursus.Titel = cursus.titel;
    //       newCursus.Duur = cursus.duur;
    //       newCursus.Cursuscode = cursus.code;
    //       newCursus.Startdatum = cursus.cursusInstanties[index].startdatum; // refactor op daadwerkelijke datum
    //       this.cursussen.push(newCursus)
    //     }
    //   }
    // })

  }
}
