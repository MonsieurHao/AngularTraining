import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
//import { ServerSideRowModelModule } from '@ag-grid-enterprise/*';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin'
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { TableauxComponent } from './Composants/tableaux/tableaux.component';
import { OngletsComponent } from './Composants/onglets/onglets.component';
import { PaginationComponent } from './Composants/pagination/pagination.component';
import { AccountUrssafState } from './Composants/store/account-urssaf.state';
import { OngletsService } from './Composants/services/onglets.service';
import { CriteresService } from './Composants/services/criteres.service';
import { FiltresComponent } from './Composants/filtres/filtres.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    TableauxComponent,
    OngletsComponent,
    PaginationComponent,
    FiltresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AgGridModule,
    NgbModule,
    HttpClientModule,
    NgxsModule.forRoot([AccountUrssafState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    CommonModule
  ],
  providers: [OngletsService,CriteresService],
  bootstrap: [AppComponent]
})
export class AppModule { }
