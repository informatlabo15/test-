import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificacionesComponent } from './planificaciones.component';

describe('PlanificacionComponent', () => {
  let component: PlanificacionesComponent;
  let fixture: ComponentFixture<PlanificacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanificacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
