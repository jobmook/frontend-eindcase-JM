import { core, outputAst } from '@angular/compiler';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import * as moment from 'moment';
import { Cursus } from '../models/cursus';

@Component({
  selector: 'app-cursus-list',
  templateUrl: './cursus-list.component.html',
  styleUrls: ['./cursus-list.component.css']
})
export class CursusListComponent implements OnInit {
  @Input() cursusList : Cursus[] = [];
  @Input() isLoading = true;
  @Input() moment!: moment.Moment;
  cursusLijstPerWeek: Cursus[] = [];

  haalDatumOp(value: moment.Moment){
    this.moment = value;
  }

  lijstInGekozenWeek(){
    let lijst: Cursus[] = [];
    this.cursusList.forEach(cursus => {
      let week = moment(cursus.Startdatum).week();
      let jaar = moment(cursus.Startdatum).year();
      if(week == this.moment.week() && jaar == this.moment.year()){
        lijst.push(cursus);
      }
    });
    return lijst;
 }
 
  constructor() { }

  ngOnInit(): void {
    this.lijstInGekozenWeek();
  }

  ngOnChanges() : void {
    this.lijstInGekozenWeek();
  }


}
