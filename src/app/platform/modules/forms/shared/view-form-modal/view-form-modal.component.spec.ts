import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFormModalComponent } from './view-form-modal.component';

describe('ViewFormModalComponent', () => {
  let component: ViewFormModalComponent;
  let fixture: ComponentFixture<ViewFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFormModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
