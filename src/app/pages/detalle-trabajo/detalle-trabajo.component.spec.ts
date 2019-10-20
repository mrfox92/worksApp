import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleTrabajoComponent } from './detalle-trabajo.component';

describe('DetalleTrabajoComponent', () => {
  let component: DetalleTrabajoComponent;
  let fixture: ComponentFixture<DetalleTrabajoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleTrabajoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
