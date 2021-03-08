import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionVisitaComponent } from './recepcion-visita.component';

describe('RecepcionVisitaComponent', () => {
  let component: RecepcionVisitaComponent;
  let fixture: ComponentFixture<RecepcionVisitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecepcionVisitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepcionVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
