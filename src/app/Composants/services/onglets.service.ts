import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrssafModel } from '../store/model/urssaf-account.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OngletsService {
  rowDataSubject$ = new Subject<UrssafModel[]>();
  url: string = 'http://localhost:3000/clients';

  constructor(private http: HttpClient) {}

  getAll(){
    return this.http.get<UrssafModel[]>(this.url);
  }
}