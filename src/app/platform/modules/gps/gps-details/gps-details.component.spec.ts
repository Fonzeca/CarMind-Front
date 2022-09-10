import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpsDetailsComponent } from './gps-details.component';

describe('GpsDetailsComponent', () => {
  let component: GpsDetailsComponent;
  let fixture: ComponentFixture<GpsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GpsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GpsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
