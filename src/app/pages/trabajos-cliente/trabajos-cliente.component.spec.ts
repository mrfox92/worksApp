import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajosClienteComponent } from './trabajos-cliente.component';

describe('TrabajosClienteComponent', () => {
  let component: TrabajosClienteComponent;
  let fixture: ComponentFixture<TrabajosClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrabajosClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabajosClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
