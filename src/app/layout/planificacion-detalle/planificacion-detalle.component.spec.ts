import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificacionDetalleComponent } from './planificacion-detalle.component';

describe('PlanificacionDetalleComponent', () => {
  let component: PlanificacionDetalleComponent;
  let fixture: ComponentFixture<PlanificacionDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanificacionDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanificacionDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
