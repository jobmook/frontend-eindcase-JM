import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-cursus-week-keuze',
  templateUrl: './cursus-week-keuze.component.html',
  styleUrls: ['./cursus-week-keuze.component.css']
})
export class CursusWeekKeuzeComponent implements OnInit {


  currentMoment!: moment.Moment;
  favorieten : moment.Moment[]= [];

  @Output()
  weekEvent = new EventEmitter<moment.Moment>();

  volgendeWeek(){
    this.weekEvent.emit(this.currentMoment.add(1, 'week'));
  }

  vorigeWeek(){
    this.weekEvent.emit(this.currentMoment.subtract(1, 'week'));
  }

  volgendJaar(){
    this.weekEvent.emit(this.currentMoment.add(1, 'year'));
  }

  vorigJaar(){
    this.weekEvent.emit(this.currentMoment.subtract(1, 'year'));
  }

  huidigeWeek(){
    this.weekEvent.emit(this.currentMoment = moment());
  }

  favoriet(){
    let favorietMoment = this.currentMoment.clone();
    this.favorieten.push(favorietMoment);
  }

  naarFavorieteWeek(value: moment.Moment){
    this.currentMoment = value.clone();
    this.weekEvent.emit(this.currentMoment);
  }

  constructor() { 
    
  }

  ngOnInit(): void {
    this.currentMoment = moment();
    this.weekEvent.emit(this.currentMoment);
  }

}
