import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteHechoComponent } from './expediente-hecho.component';

describe('ExpedienteHechoComponent', () => {
  let component: ExpedienteHechoComponent;
  let fixture: ComponentFixture<ExpedienteHechoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpedienteHechoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedienteHechoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
