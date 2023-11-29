import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NgxsModule, Store } from "@ngxs/store";
import { AgGridModule } from 'ag-grid-angular';
import { AccountUrssafState } from './Composants/store/account-urssaf.state';
import { BrowserModule } from '@angular/platform-browser';
import { TableauxComponent } from './Composants/tableaux/tableaux.component';
import { OngletsComponent } from './Composants/onglets/onglets.component';
import { FiltresComponent } from './Composants/filtres/filtres.component';

describe('AppComponent', () => {

  let store: Store;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let filtresComp: FiltresComponent;
  let filtresFixt: ComponentFixture<FiltresComponent>;
  let tableauxComp: TableauxComponent;
  let tableauxFixt: ComponentFixture<TableauxComponent>;
  let ongletsComp: OngletsComponent;
  let ongletsFixt: ComponentFixture<OngletsComponent>;
  
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
      imports: [RouterTestingModule,AgGridModule,
      NgxsModule.forRoot([AccountUrssafState]),
      HttpClientTestingModule,
      BrowserModule
      ],
      declarations: [AppComponent,TableauxComponent, OngletsComponent, FiltresComponent]
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
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      filtresFixt =TestBed.createComponent(FiltresComponent);
      filtresComp = filtresFixt.componentInstance;
      tableauxFixt = TestBed.createComponent(TableauxComponent);
      tableauxComp = tableauxFixt.componentInstance;
      ongletsFixt = TestBed.createComponent(OngletsComponent);
      ongletsComp = ongletsFixt.componentInstance;
    })
  );


  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'AngularTraining'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    
    expect(app.title).toEqual('AngularTraining');
  });

  
});
