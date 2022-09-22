import { formatDate, JsonPipe } from '@angular/common';
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

  cursussen : {Titel: string, Cursuscode:string, Duur:number, Startdatum: Date }[] = []; // refactor.
  fileEntity!: File;
  fileContents! : string;
  fileName!: string;
  aantalCursussenToegevoegd = 0;
  aantalCursusInstantiesToegevoegd = 0;
  aantalDuplicaten= 0;
  correctFormaat = true;
  foutRegel = 0;

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

resetLijst(){
  fetch('https://localhost:7183/api/cursus/remove-all-entries')
  .then(response => response)
  .then((data) => {
    console.log(data);
    this.objectenUitlezen();
    this.aantalCursussenToegevoegd = 0;
    this.aantalCursusInstantiesToegevoegd  = 0;
    this.aantalDuplicaten = 0;
  }
 );
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

fileValidation(){
  const regex = /Titel: (.*)$\nCursuscode: (.*)$\nDuur: (\d+ dagen)\nStartdatum: (\d\d?\/\d\d?\/\d\d\d\d)\n/gm;
}

readFile(){
  this.aantalCursussenToegevoegd = 0;
  this.aantalCursusInstantiesToegevoegd = 0;
  this.aantalDuplicaten= 0;
  this.correctFormaat = true;
  this.foutRegel = 0;
  let fileReader = new FileReader();
  fileReader.onload = () => {
  console.log(fileReader.result); // read entire file
  this.fileContents =  fileReader.result as string;
  
  let blokje: string[] = this.fileContents.split('\n\n');
  let cursusLijst: {}[] = [];
  let nieuweCursus : { Titel:string, Cursuscode:string, Duur:number, Startdatum: string} = {Titel:'', Cursuscode:'', Duur:0, Startdatum:'' };
  
  let counter = 0;
  const regex = /Titel: (.*)$\nCursuscode: (.*)$\nDuur: (\d+ dagen)\nStartdatum: (\d\d?\/\d\d?\/\d\d\d\d)\n/gm;
  let lines: string[] = this.fileContents.split('\n');
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
        // let formattedString = foundStartdatum[1].substring(3,5) + '/' + foundStartdatum[1].substring(0,2) + '/' + foundStartdatum[1].substring(6);
        nieuweCursus.Startdatum = foundStartdatum[1];
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
      cursusLijst.push(nieuweCursus);
      counter = 0;
      nieuweCursus = {Titel:'', Cursuscode:'', Duur:0, Startdatum:'' };
    }
    else counter++; 
  }

  cursusLijst.forEach(cursus => {
    console.log(cursus);
  });
  
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

// let blokje: string[] = this.fileContents.split('\n\n');
//     //blokje.pop(); // verwijdert laatste lege array.
//     let cursusLijst: {}[] = [];
// console.log(blokje[0]);
// blokje.forEach(line => {
//   let cursusBlok = line.split('\n');
//   let nieuweCursus : { Titel:string, Cursuscode:string, Duur:number, Startdatum: string} = {Titel:'', Cursuscode:'', Duur:0, Startdatum:'' };
//   cursusBlok.forEach(line => {
//     if(line.startsWith('Titel')){
//       nieuweCursus.Titel = line.substring(7);
//     } else if(line.startsWith('Cursuscode')){
//       nieuweCursus.Cursuscode = line.substring(12);
//     } else if(line.startsWith('Duur')){
//       nieuweCursus.Duur = +line.substring(6,7);
//     } else if(line.startsWith('Startdatum')){
//       nieuweCursus.Startdatum = line.substring(12)
//     } else {
//       console.log('Cannot read line.');
//     }
//   });
//   cursusLijst.push(nieuweCursus);
// });
// console.log('Cursuslijst lengte: ' + cursusLijst.length)
// cursusLijst.forEach(cursus => {
//   console.log(cursus);
// });

// fetch('https://localhost:7183/api/cursus', {
//     method: 'POST',
//     headers:{
//       'Content-Type':'application/json'
//     },
//     body: JSON.stringify(cursusLijst)
//   })
//   .then((response) => response.json())
//   .then((data) => {
//   console.log('Success:', data);
//   this.aantalCursusInstantiesToegevoegd = data.cursusInstantieToevoeging;
//   this.aantalCursussenToegevoegd = data.cursusToevoeging;
//   this.aantalDuplicaten = data.duplicaten;
//   }).then(() => this.objectenUitlezen())
//   .catch((error) => {
//     console.error('Error:', error);
//   });  
  fileReader.readAsText(this.fileEntity);
};
constructor(private cursusService: CursusService) { }

ngOnInit(): void {
  this.objectenUitlezen();
};


ngOnChange(){

}
}  
    // while(index + 3 < lines.length) {
    //   let titleLine = lines[index];
    //   let cursusCodeLine = lines[index+1];
    //   let duurLine = lines[index + 2];
    //   let startdatumLine = lines[index + 3];

    //   index += 5;
    // }
    
//     console.log(blokje[0]);
//     blokje.forEach(line => {
//       let cursusBlok = line.split('\n');
//       let nieuweCursus : { Titel:string, Cursuscode:string, Duur:number, Startdatum: string} = {Titel:'', Cursuscode:'', Duur:0, Startdatum:'' };
//       cursusBlok.forEach(line => {
//         if(line.startsWith('Titel')){
//           nieuweCursus.Titel = line.substring(7);
//         } else if(line.startsWith('Cursuscode')){
//           nieuweCursus.Cursuscode = line.substring(12);
//         } else if(line.startsWith('Duur')){
//           nieuweCursus.Duur = +line.substring(6,7);
//         } else if(line.startsWith('Startdatum')){
//           nieuweCursus.Startdatum = line.substring(12)
//         } else {
//           console.log('Cannot read line.');
//         }
//       });
//       cursusLijst.push(nieuweCursus);
//     });
//     console.log('Cursuslijst lengte: ' + cursusLijst.length)
//     cursusLijst.forEach(cursus => {
//       console.log(cursus);
//     });

//     fetch('https://localhost:7183/api/cursus', {
//         method: 'POST',
//         headers:{
//           'Content-Type':'application/json'
//         },
//         body: JSON.stringify(cursusLijst)
//       })
//       .then((response) => response.json())
//       .then((data) => {
//       console.log('Success:', data);
//       this.aantalCursusInstantiesToegevoegd = data.cursusInstantieToevoeging;
//       this.aantalCursussenToegevoegd = data.cursusToevoeging;
//       this.aantalDuplicaten = data.duplicaten;
//       }).then(() => this.objectenUitlezen())
//       .catch((error) => {
//         console.error('Error:', error);
//       });  
//   };
//   fileReader.readAsText(this.fileEntity);
// }

 
