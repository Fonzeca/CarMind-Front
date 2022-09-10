import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpsListComponent } from './gps-list.component';

describe('GpsListComponent', () => {
  let component: GpsListComponent;
  let fixture: ComponentFixture<GpsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GpsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GpsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
