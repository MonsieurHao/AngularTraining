import { Component, Injectable } from '@angular/core';
import { 
  NgbDatepickerModule, 
  NgbDateStruct, 
  NgbCalendar, 
  NgbDateAdapter,
  NgbDateParserFormatter, 
  NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

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
  imports: [NgbDatepickerModule, FormsModule, JsonPipe, NgbDropdownModule],
  templateUrl: './criteres.component.html',
  styleUrls: ['./criteres.component.scss']
})
export class CriteresComponent {

  model1: string | undefined;
	model2: string | undefined;

	constructor(private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>) {}

	get today() {
		return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
	}

  

  onUpdateList() {
    console.log("Actualise le tableau");
    }
    onReinitCritere() {
      console.log("Réinitialise les critères");
    }
      
}
