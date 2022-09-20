import { Component, OnInit } from '@angular/core';
import { CURSUSSEN } from '../mock-cursussen';

@Component({
  selector: 'app-cursussen',
  templateUrl: './cursussen.component.html',
  styleUrls: ['./cursussen.component.css']
})
export class CursussenComponent implements OnInit {

  cursussen = CURSUSSEN;

  constructor() { }

  ngOnInit(): void {
  }

}
