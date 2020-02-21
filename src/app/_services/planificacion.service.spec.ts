import { TestBed } from '@angular/core/testing';

import { PlanificacionService } from './planificacion.service';

describe('PlanificacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlanificacionService = TestBed.get(PlanificacionService);
    expect(service).toBeTruthy();
  });
});
