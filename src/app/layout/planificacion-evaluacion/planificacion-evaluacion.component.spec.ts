import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificacionEvaluacionComponent } from './planificacion-evaluacion.component';

describe('PlanificacionEvaluacionComponent', () => {
  let component: PlanificacionEvaluacionComponent;
  let fixture: ComponentFixture<PlanificacionEvaluacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanificacionEvaluacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanificacionEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
