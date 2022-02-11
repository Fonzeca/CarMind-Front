import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleVehiculeComponent } from './detalle-vehicule.component';

describe('DetalleVehiculeComponent', () => {
  let component: DetalleVehiculeComponent;
  let fixture: ComponentFixture<DetalleVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleVehiculeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
