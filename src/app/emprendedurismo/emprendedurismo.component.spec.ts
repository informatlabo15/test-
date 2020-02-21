import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmprendedurismoComponent } from './emprendedurismo.component';

describe('EmprendedurismoComponent', () => {
  let component: EmprendedurismoComponent;
  let fixture: ComponentFixture<EmprendedurismoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmprendedurismoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmprendedurismoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
