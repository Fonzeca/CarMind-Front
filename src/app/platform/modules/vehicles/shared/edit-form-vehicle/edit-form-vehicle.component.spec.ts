import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormVehicleComponent } from './edit-form-vehicle.component';

describe('NewVehicleComponent', () => {
  let component: EditFormVehicleComponent;
  let fixture: ComponentFixture<EditFormVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFormVehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFormVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
