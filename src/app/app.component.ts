import {  Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetAccountsAction } from './Composants/store/account-urssaf.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  constructor(private store: Store){}
  title = 'AngularTraining';
  
  ngOnInit(): void{
    this.store.dispatch(new GetAccountsAction());
  }
  
}
