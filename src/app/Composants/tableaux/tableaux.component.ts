import { Component, OnInit, ViewChild } from '@angular/core';
import { ColDef,
        GridReadyEvent,
        StatusPanelDef,
        GridApi,
        ExcelExportParams} from 'ag-grid-community';
import { Select, Store } from '@ngxs/store';
import { AccountUrssafState } from '../store/account-urssaf.state';
import { UrssafModel } from '../store/model/urssaf-account.model';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { OngletsService } from '../services/onglets.service';

@Component({
  selector: 'app-tableaux',
  templateUrl: './tableaux.component.html',
  styleUrls: ['./tableaux.component.scss']
})
export class TableauxComponent {

  colDefs: ColDef[] = [
    {headerName:'Numéro de cotisant', field:'num_cotisant' , sortable: true, filter: true},
    {headerName:'Début période', field: 'début_période', sortable: true, filter: true},
    {headerName:'Fin période', field: 'fin_période', sortable: true, filter: true},
    {headerName:'Type de compte', field: 'type_compte' , sortable: true, filter: true},
    {headerName:"Nature de l'activité", field:'nature_activite' , sortable: true, filter: true},
    {headerName:'Catégorie de cotisant', field:'cat_cotisant' , sortable: true, filter: true},
    {headerName:"Etat de l'image", field:'etat_image' , sortable: true, filter: true}
  ];
  
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 90,
    resizable: true,
  };

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  public gridApi!: GridApi<UrssafModel>
  
  pageSize!:number;
  public paginationPageSize = 5;
  
  @Select(AccountUrssafState.getAccountsSelector) rowData$!: Observable<UrssafModel[]>;
  
  constructor(private ongletService: OngletsService,private store: Store){}
  
  onGridReady(params: GridReadyEvent<UrssafModel>){
    this.gridApi = params.api
  }
  
  onChangeGrid(submit$: Observable<UrssafModel[]>) {
    submit$.subscribe((res) => {
      this.agGrid.api.setRowData(res);
    });
  }

  /*onButtonExport($event: ExcelExportParams) {
    console.log("export button pressed");
    this.gridApi.exportDataAsExcel($event);
  }*/

  exportToCsv() {
    if (this.agGrid.api) {
      // Init with headers
      let dataToExport =
        this.colDefs.map(col => col.headerName).join(';') + '\n';
      this.agGrid.api.getRenderedNodes().forEach(row => {
        if (row.data) {
          Object.values(row.data).forEach(entry => {
            const dataToInsert =
              typeof entry === 'object' && moment(entry).isValid()
                ? moment(entry).format('DD/MM/YYYY')
                : entry;

            dataToExport += dataToInsert + ';';
          });
          dataToExport += '\n'; // Not node return to line
        }
      });

      const blob = new Blob([dataToExport], { type: 'text/csv' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'export';
      a.click();
    }
  }

  onSelected(event:any){
    this.paginationPageSize=event.target.value;
  }


}