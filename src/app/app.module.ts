import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CursusInvoerenComponent } from './cursus-invoeren/cursus-invoeren.component';
import { HttpClientModule } from '@angular/common/http';
import { CursusListComponent } from './cursus-list/cursus-list.component';
import { CursussenComponent } from './cursussen/cursussen.component';
import { CursusWeekKeuzeComponent } from './cursus-week-keuze/cursus-week-keuze.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CursussenComponent,
    CursusInvoerenComponent,
    CursusListComponent,
    CursusWeekKeuzeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
