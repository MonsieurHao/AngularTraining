import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UrssafModel } from '../store/model/urssaf-account.model';

@Injectable({
  providedIn: 'root',
})
export class CriteresService {
  rowDataSubject$ = new Subject<UrssafModel[]>();
  url: string = ' http://localhost:3000/clients';

  constructor(private http: HttpClient) {}

  getByNumbers(form: any) {
    let filters = new HttpParams();
    if (form.selectAccount !== 'Tous' && form.selectAccount) {
      filters = filters.append('num_cotisant', form.selectAccount);
    }
    if (form.selectUR !== 'Toutes' && form.selectUR) {
      filters = filters.append('nature_activite', form.selectUR);
    }
    if (form.selectType !== 'Tous' && form.selectType) {
      filters = filters.append('type_compte', form.selectType);
    }
    
    return this.http.get<UrssafModel[]>(
      ' http://localhost:3000/clients',
      { params: filters }
    );
  }
  refreshTable(): void {
    (this.http.get<UrssafModel[]>(this.url).subscribe(response => {
        this.rowDataSubject$.next(response);
    }));
  }

  getFilteredElements(num: number, ur: string, type: string, deb: Date, fin: Date): void {
    var params: HttpParams = new HttpParams();

    if(num !== 0) params = params.append('num_cotisant', num);
    if(ur !== '-') params = params.append('nature_activite', ur);
    if(type !== '-') params = params.append('type_compte', type);
    if(deb !== null) params = params.append('début_période', ""+deb);
    if(fin !== null) params = params.append('fin_période', ""+fin);


    (this.http.get<UrssafModel[]>(this.url, {params:params})).subscribe(response => {
        this.rowDataSubject$.next(response);
    })
}


}
