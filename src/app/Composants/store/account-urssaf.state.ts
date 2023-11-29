import { Injectable } from '@angular/core';
import { Action, createSelector, Selector, State, StateContext } from '@ngxs/store';
import { filter, tap } from 'rxjs';
import { CriteresService } from '../services/criteres.service';
import { OngletsService } from '../services/onglets.service';
import { GetAccountsAction } from './account-urssaf.actions';
import { UrssafModel } from './model/urssaf-account.model';

export interface UrssafStateModel {
  GetAccountsInterface: UrssafModel[];
}

@State<UrssafStateModel>({
  name: 'GetAccounts',
  defaults: {
    GetAccountsInterface: [],
  },
})
@Injectable()
export class AccountUrssafState {

  constructor(private ongletService: OngletsService) {}

  @Selector()
  static getAccountsSelector(state: UrssafStateModel) {
    return state.GetAccountsInterface;
  }

  @Action(GetAccountsAction)
  getAccountsStateAction(ctx: StateContext<UrssafStateModel>) {
    //console.log(this.ongletService);
    return this.ongletService.getAll().pipe(
      tap((res) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          GetAccountsInterface: res,
        });
      })
    );
  }

  

 
}
