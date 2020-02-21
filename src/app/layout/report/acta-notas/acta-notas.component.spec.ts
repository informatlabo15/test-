import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActaNotasComponent } from './acta-notas.component';

describe('ActaNotasComponent', () => {
  let component: ActaNotasComponent;
  let fixture: ComponentFixture<ActaNotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActaNotasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActaNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
