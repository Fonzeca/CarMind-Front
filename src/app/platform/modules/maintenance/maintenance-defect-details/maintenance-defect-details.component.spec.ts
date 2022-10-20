import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceDefectDetailsComponent } from './maintenance-defect-details.component';

describe('MaintenanceDefectDetailsComponent', () => {
  let component: MaintenanceDefectDetailsComponent;
  let fixture: ComponentFixture<MaintenanceDefectDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceDefectDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceDefectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
