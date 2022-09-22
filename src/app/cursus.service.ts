import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Cursus } from './models/cursus';

@Injectable({
  providedIn: 'root'
})
export class CursusService {

  getUrl = 'https://localhost:7183/api/cursus';
  cursussen: Cursus[] = [];

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Cursus[]> {
    // return this.contacts;
    return this.httpClient.get<Cursus[]>(this.getUrl);
  };

  add(cursusLijst: Cursus[]): void {
    // this.contacts.push(newContact);
    // this.httpClient
    //   .post<Contact>(this.url, newContact)
    //   .subscribe((contact: Contact) => {
    //     console.log('add()');
    //     this.contacts.push(contact);
    //     this.subject.next(this.contacts);
    //   })
  };


}
