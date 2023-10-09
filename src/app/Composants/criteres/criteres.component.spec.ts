import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteresComponent } from './criteres.component';

describe('CriteresComponent', () => {
  let component: CriteresComponent;
  let fixture: ComponentFixture<CriteresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CriteresComponent]
    });
    fixture = TestBed.createComponent(CriteresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
