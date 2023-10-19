import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColDef,
        GridReadyEvent,
        IServerSideDatasource,
        RowModelType,} from 'ag-grid-community';

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
  rowData: any[] = [
    {num_cotisant: 8, début_période: '29/09/2022', fin_période: '29/10/2023', type_compte: 'Permanent', nature_activite: 'informatique', cat_cotisant: 'Catégorie 2', etat_image: 'valide'},
    {num_cotisant: 752, début_période: '15/02/2022', fin_période: '15/12/2023', type_compte: 'Temporaire', nature_activite: 'artistique', cat_cotisant: 'Catégorie 5', etat_image: 'valide'},
    {num_cotisant: 68, début_période: '03/04/2022', fin_période: '03/09/2023', type_compte: 'Permanent', nature_activite: 'comptable', cat_cotisant: 'Catégorie 1', etat_image: 'en attente'}
  ];

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 90,
    resizable: true,
  };
  public rowModelType: RowModelType = 'serverSide';
  public paginationPageSize = 10;
  public cacheBlockSize = 10;
  public rowData!: IClientsDataWithId[];
  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent<IClientsDataWithId>) {
    this.http                                                        //change with own JSON server data
      .get<IClientsDataWithId[]>(
        'https://www.ag-grid.com/example-assets/olympic-winners.json'
      )
      .subscribe((data) => {
        // add id to data
        var idSequence = 1;
        data.forEach(function (item: any) {
          item.id = idSequence++;
        });
        // setup the fake server with entire dataset
        var fakeServer = new FakeServer(data);
        // create datasource with a reference to the fake server
        var datasource = getServerSideDatasource(fakeServer);
        // register the datasource with the grid
        params.api!.setServerSideDatasource(datasource);
      });
  }

  function getServerSideDatasource(server: any): IServerSideDatasource {
  return {
    getRows: (params) => {
      console.log('[Datasource] - rows requested by grid: ', params.request);
      var response = server.getData(params.request);
      // adding delay to simulate real server call
      setTimeout(function () {
        if (response.success) {
          // call the success callback
          params.success({
            rowData: response.rows,
            rowCount: response.lastRow,
          });
        } else {
          // inform the grid request failed
          params.fail();
        }
      }, 200);
    },
  };
}
  
}


