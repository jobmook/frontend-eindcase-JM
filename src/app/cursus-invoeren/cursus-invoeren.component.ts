import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cursus-invoeren',
  templateUrl: './cursus-invoeren.component.html',
  styleUrls: ['./cursus-invoeren.component.css']
})
export class CursusInvoerenComponent implements OnInit {
  fileEntity!: File;
  fileContents! : string;
  fileName!: string;

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
      let newCursus : {Titel:string, Cursuscode:string, Duur:string, Startdatum: string} = {Titel:'', Cursuscode:'', Duur:'', Startdatum:''};
      cursusBlok.forEach(line => {
        if(line.startsWith('Titel')){
          newCursus.Titel = line.substring(7);
        } else if(line.startsWith('Cursuscode')){
          newCursus.Cursuscode = line.substring(12);
        } else if(line.startsWith('Duur')){
          newCursus.Duur = line.substring(6);
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


    // let cursusLijst = [];
    // let index = 0;
    // let Cursus : {Titel:string, Duur: string, Code: string, Startdatum:string};
    // lines.forEach(line => {
    //   console.log(line)

    //   index++;
    // });


  }
  fileReader.readAsText(this.fileEntity);
}

readFileContents(){
  
}
  
constructor() { }

  
ngOnInit(): void {

}

}
