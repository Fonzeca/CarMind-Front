import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpsVehicleListComponent } from './gps-vehicle-list.component';

describe('GpsVehicleListComponent', () => {
  let component: GpsVehicleListComponent;
  let fixture: ComponentFixture<GpsVehicleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GpsVehicleListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GpsVehicleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
