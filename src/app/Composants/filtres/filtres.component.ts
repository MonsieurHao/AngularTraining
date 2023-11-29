
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Select } from '@ngxs/store';
import { Observable} from 'rxjs';
import { AccountUrssafState } from '../store/account-urssaf.state';
import { UrssafModel } from '../store/model/urssaf-account.model';
import { CriteresService } from '../services/criteres.service';

@Component({
  selector: 'app-filtres',
  templateUrl: './filtres.component.html',
  styleUrls: ['./filtres.component.scss']
})
export class FiltresComponent {
  searchForm!: FormGroup;
  boole!: boolean;

  @Select(AccountUrssafState.getAccountsSelector)storeData$!: Observable<UrssafModel[]>;

  numAccounts: number[] = [];
  urAccounts: string[] = [];
  typeAccounts: string[] = [];

  constructor(private formBuilder: FormBuilder, private criteresService: CriteresService) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      num_compte: new FormControl('Tous'),
      ur_compte: new FormControl('Toutes'),
      type_compte: new FormControl('Tous'),
      deb: new FormControl(null, [Validators.required, this.dateRangeValidator]),
      fin: new FormControl(null, [Validators.required, this.dateRangeValidator])
    }, {
      validators: [this.dateRangeValidator()]
    });

    // Get all the datas for the selects in the filter section
    this.storeData$.subscribe(item => {
      item.forEach(element => {
        if(!this.numAccounts.includes(element.num_cotisant))this.numAccounts.push(element.num_cotisant);
        if(!this.urAccounts.includes(element.nature_activite))this.urAccounts.push(element.nature_activite);
        if(!this.typeAccounts.includes(element.type_compte))this.typeAccounts.push(element.type_compte);
      });
    });
  }

  onReinit():  void {
    this.searchForm.reset();
    this.searchForm.patchValue({
      num_compte: 'Tous',
      ur_compte:'Toutes',
      type_compte: 'Tous',
    });
  }

  onUpdate(form: FormGroup): void {
    var num: number = 0;
    var ur: string = '-';
    var type: string = '-';
    var start: Date = form.value.deb;
    var end: Date = form.value.fin;

    if(form.value.num_compte != 'Tous') num = form.value.num_compte;
    if(form.value.ur_compte != 'Toutes') ur = form.value.ur_compte;
    if(form.value.type_compte != 'Tous') type = form.value.type_compte;

    if(num !== 0 || ur !== '-' || type!=='-' || start!==null || end!==null)
      this.criteresService.getFilteredElements(num, ur, type, start, end);
    else
      this.criteresService.refreshTable();

    this.onReinit();
  }

  dateRangeValidator(): ValidatorFn {
    return (form: AbstractControl): Validators | null => {
      const start: Date = form.value.deb;
      const end: Date = form.value.fin;

      if(start && end) {
        const isRangeValid = (end.getDate() - start.getDate() > 0);
        return isRangeValid ? null : (this.boole = true)
      }
      
      return null;
    }
  }

}
