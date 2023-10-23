import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UtilisateursComponent } from './Composants/utilisateurs/utilisateurs.component';
import { AgGridModule } from 'ag-grid-angular';
import { CriteresComponent } from './Composants/criteres/criteres.component';
import { TableauxComponent } from './Composants/tableaux/tableaux.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    UtilisateursComponent,
    TableauxComponent
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
