import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificacionesesComponent } from './planificaciones.component';

describe('PlanificacionesesComponent', () => {
  let component: PlanificacionesesComponent;
  let fixture: ComponentFixture<PlanificacionesesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanificacionesesesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanificacionesesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
