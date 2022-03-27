import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicileReviewComponent } from './vehicile-review.component';

describe('VehicileReviewComponent', () => {
  let component: VehicileReviewComponent;
  let fixture: ComponentFixture<VehicileReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicileReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicileReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
