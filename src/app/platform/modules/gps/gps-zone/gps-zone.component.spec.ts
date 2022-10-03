import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpsZoneComponent } from './gps-zone.component';

describe('GpsZoneComponent', () => {
  let component: GpsZoneComponent;
  let fixture: ComponentFixture<GpsZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GpsZoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GpsZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
