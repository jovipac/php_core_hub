import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintanceProfileComponent } from './maintance-profile.component';

describe('MaintanceProfileComponent', () => {
  let component: MaintanceProfileComponent;
  let fixture: ComponentFixture<MaintanceProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintanceProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintanceProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
