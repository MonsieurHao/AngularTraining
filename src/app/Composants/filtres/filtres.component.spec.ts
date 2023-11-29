import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule, Store } from "@ngxs/store";
import { AgGridModule } from 'ag-grid-angular';
import { AccountUrssafState } from '../store/account-urssaf.state';
import { BrowserModule } from '@angular/platform-browser';
import { OngletsComponent } from '../onglets/onglets.component';
import { FiltresComponent } from './filtres.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { GetAccountsAction } from '../store/account-urssaf.actions';
import { TableauxComponent } from '../tableaux/tableaux.component';

describe('FiltresComponent', () => {
  let component: FiltresComponent;
  let fixture: ComponentFixture<FiltresComponent>;
  let tabComp: TableauxComponent;
  let tabFixt: ComponentFixture<TableauxComponent>;
  let store: Store;

  beforeEach(
    waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FiltresComponent],
      imports:[HttpClientTestingModule,
              BrowserModule,
              RouterTestingModule,
              ReactiveFormsModule,
              NgxsModule.forRoot([AccountUrssafState])
              ]
    }).compileComponents();
    
    store = TestBed.inject(Store);
      store.reset({
        ...store.snapshot(),
        accounts: [
          {
            "id": 1,
            "num_cotisant": 8,
            "début_période": "29-09-2022", 
            "fin_période": "29-10-2023", 
            "type_compte": "Permanent", 
            "nature_activite": "informatique", 
            "cat_cotisant": "Catégorie 2", 
            "etat_image": "valide"
          },
          {
            "id": 2,
            "num_cotisant": 752, 
            "début_période": "15-02-2022", 
            "fin_période": "15-12-2023",
            "type_compte": "Temporaire", 
            "nature_activite": "artistique", 
            "cat_cotisant": "Catégorie 5", 
            "etat_image": "valide"
          },
          {
            "id": 3,
            "num_cotisant": 68,
            "début_période": "03-04-2022", 
            "fin_période": "03-09-2023", 
            "type_compte": "Permanent", 
            "nature_activite": "comptable", 
            "cat_cotisant": "Catégorie 1", 
            "etat_image": "en attente"
          },
          {
            "id": 4,
            "num_cotisant": 4531,
            "début_période": "29-09-2022", 
            "fin_période": "29-10-2023", 
            "type_compte": "Permanent", 
            "nature_activite": "informatique", 
            "cat_cotisant": "Catégorie 2", 
            "etat_image": "valide"
          },
          {
            "id": 5,
            "num_cotisant": 123658, 
            "début_période": "15-02-2022", 
            "fin_période": "15-12-2023",
            "type_compte": "Temporaire", 
            "nature_activite": "artistique", 
            "cat_cotisant": "Catégorie 5", 
            "etat_image": "valide"
          },
          {
            "id": 6,
            "num_cotisant": 5,
            "début_période": "03-04-2022", 
            "fin_période": "03-09-2023", 
            "type_compte": "Permanent", 
            "nature_activite": "comptable", 
            "cat_cotisant": "Catégorie 1", 
            "etat_image": "en attente"
          },{
            "id": 7,
            "num_cotisant": 15533,
            "début_période": "29-09-2022", 
            "fin_période": "29-10-2023", 
            "type_compte": "Permanent", 
            "nature_activite": "informatique", 
            "cat_cotisant": "Catégorie 2", 
            "etat_image": "valide"
          },
          {
            "id": 8,
            "num_cotisant": 4587, 
            "début_période": "15-02-2022", 
            "fin_période": "15-12-2023",
            "type_compte": "Temporaire", 
            "nature_activite": "artistique", 
            "cat_cotisant": "Catégorie 5", 
            "etat_image": "valide"
          },
          {
            "id": 9,
            "num_cotisant": 9854,
            "début_période": "03-04-2022", 
            "fin_période": "03-09-2023", 
            "type_compte": "Permanent", 
            "nature_activite": "comptable", 
            "cat_cotisant": "Catégorie 1", 
            "etat_image": "en attente"
          }
        ]
      });
    fixture = TestBed.createComponent(FiltresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
