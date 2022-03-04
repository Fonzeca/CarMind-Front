import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclePreviewComponent } from './vehicle-preview.component';

describe('VehiclePreviewComponent', () => {
  let component: VehiclePreviewComponent;
  let fixture: ComponentFixture<VehiclePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclePreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
