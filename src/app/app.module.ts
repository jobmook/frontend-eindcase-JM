import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CursusInvoerenComponent } from './cursus-invoeren/cursus-invoeren.component';
import { HttpClientModule } from '@angular/common/http';
import { CursusListComponent } from './cursus-list/cursus-list.component';
import { CursussenComponent } from './cursussen/cursussen.component';
import { CursusFavorietenComponent } from './cursus-favorieten/cursus-favorieten.component';

@NgModule({
  declarations: [
    AppComponent,
    CursussenComponent,
    CursusInvoerenComponent,
    CursusListComponent,
    CursusFavorietenComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
