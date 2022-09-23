import { outputAst } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Cursus } from '../models/cursus';

@Component({
  selector: 'app-cursus-list',
  templateUrl: './cursus-list.component.html',
  styleUrls: ['./cursus-list.component.css']
})
export class CursusListComponent implements OnInit {
  @Input() cursusList : Cursus[] = [];


  constructor() { }

  ngOnInit(): void {
  }

}
