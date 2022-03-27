import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleReviewComponent } from './vehicle-review.component';

describe('VehicileReviewComponent', () => {
  let component: VehicleReviewComponent;
  let fixture: ComponentFixture<VehicleReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
