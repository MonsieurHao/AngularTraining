import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-onglets',
  templateUrl: './onglets.component.html',
  styleUrls: ['./onglets.component.scss']
})
export class OngletsComponent {
  @Output() tabClicked= new EventEmitter<any>();
  
  onClick() {
    this.tabClicked.emit();
  }

}

