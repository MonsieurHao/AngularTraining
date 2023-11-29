import { Component, EventEmitter, Injectable, OnDestroy, OnInit, Output } from '@angular/core';
import { 
  NgbDatepickerModule, 
  NgbDateStruct, 
  NgbCalendar, 
  NgbDateAdapter,
  NgbDateParserFormatter, 
  NgbDropdownModule,
  NgbDate} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { AccountUrssafState } from '../store/account-urssaf.state';
import { UrssafModel } from '../store/model/urssaf-account.model';
import { Select } from '@ngxs/store';
import { CriteresService } from '../services/criteres.service';

///Handles how the date is represented in scripts
@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {
  readonly DELIMITER = '-';
  
	fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
			return {
        day: parseInt(date[0], 10),
				month: parseInt(date[1], 10),
				year: parseInt(date[2], 10),
			};
		}
		return null;
	}
  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }
}
///To interpret keyboard input and render properly
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
	readonly DELIMITER = '/';

	parse(value: string): NgbDateStruct | null {
		if (value) {
			const date = value.split(this.DELIMITER);
			return {
				day: parseInt(date[0], 10),
				month: parseInt(date[1], 10),
				year: parseInt(date[2], 10),
			};
		}
		return null;
	}

	format(date: NgbDateStruct | null): string {
		return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
	}
}

@Component({
  selector: 'app-criteres',
  standalone: true,
  imports: [NgbDatepickerModule, FormsModule, JsonPipe, NgbDropdownModule, CommonModule],
  templateUrl: './criteres.component.html',
  styleUrls: ['./criteres.component.scss']
})
export class CriteresComponent {

	hoveredDate: NgbDate | null = null;
  	fromDate: NgbDate | null;
  	toDate: NgbDate | null;
	model1: string | undefined;
	model2: string | undefined;
	accountForm!: FormGroup;

	rowData$!: Observable<UrssafModel[]>;
	private numberChanged: Subscription = new Subscription;
  	private urChanged: Subscription = new Subscription;
  	private typeChanged: Subscription = new Subscription;
	accounts =[1,2,3,4,5,6,7];
	accountsUR =[1,2,3,4,5,6,7];
	accountTypes =["Temporaire", "Permanent"];

	
	constructor(private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>, 
				private service:CriteresService) 
	{
		this.fromDate = ngbCalendar.getToday();
		this.toDate = ngbCalendar.getNext(ngbCalendar.getToday(),'d',5);
	}

	get today() {
		return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
	}
	
	ngOnInit():void{
		this.accountForm = new FormGroup({
			selectAccount: new FormControl('Tous'),
			selectUR: new FormControl('Toutes'),
			selectType: new FormControl('Tous'),
			selectDdate: new FormControl(),
			selectFdate: new FormControl(),
		});

		
	}
	

	onUpdateList() {
    	console.log("Actualise le tableau");
    }

	onSubmitData$!: Observable<UrssafModel[]>;
  	@Output() onSubmited: EventEmitter<any> = new EventEmitter();
  	onSubmit() {
		console.log(this.accountForm.value);
		this.onSubmitData$ = this.service.getByNumbers(this.accountForm.value);
		this.onSubmited.emit(this.onSubmitData$);
	}

    onReinitCritere() {
    	this.accountForm.reset();
    	this.accountForm.patchValue({
      	selectAccount: 'Tous',
      	selectUR: 'Toutes',
      	selectType: 'Tous',
    });
    }

	ngOnDestroy(): void {
		this.numberChanged.unsubscribe();
    	this.typeChanged.unsubscribe();
    	this.urChanged.unsubscribe();
	}
		
      
}
