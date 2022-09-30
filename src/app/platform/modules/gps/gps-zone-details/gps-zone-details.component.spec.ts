import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpsZoneDetailsComponent } from './gps-zone-details.component';

describe('GpsZoneDetailsComponent', () => {
  let component: GpsZoneDetailsComponent;
  let fixture: ComponentFixture<GpsZoneDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GpsZoneDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GpsZoneDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

