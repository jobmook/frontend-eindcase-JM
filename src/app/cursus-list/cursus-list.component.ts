import { outputAst } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Cursus } from '../models/cursus';

@Component({
  selector: 'app-cursus-list',
  templateUrl: './cursus-list.component.html',
  styleUrls: ['./cursus-list.component.css']
})
export class CursusListComponent implements OnInit {
  @Input() cursusList : Cursus[] = [];
  currentWeek = 0;
  currentYear = 0;

  getCurrentWeekNumberAndYear(){
    this.currentWeek = moment().week();
    this.currentYear = moment().year();
  }

  constructor() { }

  ngOnInit(): void {
    this.getCurrentWeekNumberAndYear();
  }

}
