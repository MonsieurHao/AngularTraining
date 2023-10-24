import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { CriteresComponent } from './Composants/criteres/criteres.component';
import { TableauxComponent } from './Composants/tableaux/tableaux.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { OngletsComponent } from './Composants/onglets/onglets.component';
import { StoreComponent } from './Composants/store/store.component';
import { PaginationComponent } from './Composants/pagination/pagination.component';


@NgModule({
  declarations: [
    AppComponent,
    TableauxComponent,
    OngletsComponent,
    StoreComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule,
    NgbModule,
    CriteresComponent,
    HttpClientModule
  ],
  exports:[
    CriteresComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
