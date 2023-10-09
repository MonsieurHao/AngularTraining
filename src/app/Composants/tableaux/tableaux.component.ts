import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-tableaux',
  templateUrl: './tableaux.component.html',
  styleUrls: ['./tableaux.component.scss']
})
export class TableauxComponent {

  rowData: any[] = [
    {num_cotisant: 8, début_période: '29/09/2022', fin_période: '29/10/2023'},
    {num_cotisant: 752, début_période: '15/02/2022', fin_période: '15/12/2023'},
    {num_cotisant: 68, début_période: '03/04/2022', fin_période: '03/09/2023'}
  ];
  colDefs: ColDef[] = [
    {field: 'Numéro de cotisant', sortable: true, filter: true},
    {field: 'Début période', sortable: true, filter: true},
    {field: 'Fin période', sortable: true, filter: true},
    {field: 'type de compte', sortable: true, filter: true},
    {field: 'nature de l activité', sortable: true, filter: true},
    {field: 'catégorie de cotisant', sortable: true, filter: true},
    {field: 'état de l image', sortable: true, filter: true}
  ];
}
