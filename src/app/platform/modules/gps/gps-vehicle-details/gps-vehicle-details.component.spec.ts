import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpsVehicleDetailsComponent } from './gps-vehicle-details.component';

describe('GpsVehicleDetailsComponent', () => {
  let component: GpsVehicleDetailsComponent;
  let fixture: ComponentFixture<GpsVehicleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GpsVehicleDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GpsVehicleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
