import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedientePersonaComponent } from './expediente-persona.component';

describe('ExpedientePersonaComponent', () => {
  let component: ExpedientePersonaComponent;
  let fixture: ComponentFixture<ExpedientePersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpedientePersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedientePersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
