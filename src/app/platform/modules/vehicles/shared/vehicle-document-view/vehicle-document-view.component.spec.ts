import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleDocumentViewComponent } from './vehicle-document-view.component';

describe('VehicleDocumentViewComponent', () => {
  let component: VehicleDocumentViewComponent;
  let fixture: ComponentFixture<VehicleDocumentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleDocumentViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleDocumentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
