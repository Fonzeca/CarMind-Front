import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceDefectListComponent } from './maintenance-defect-list.component';

describe('MaintenanceDefectListComponent', () => {
  let component: MaintenanceDefectListComponent;
  let fixture: ComponentFixture<MaintenanceDefectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceDefectListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceDefectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
