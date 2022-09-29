import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFormVehicleComponent } from './create-form-vehicle.component';

describe('NewVehicleComponent', () => {
  let component: CreateFormVehicleComponent;
  let fixture: ComponentFixture<CreateFormVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFormVehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFormVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
