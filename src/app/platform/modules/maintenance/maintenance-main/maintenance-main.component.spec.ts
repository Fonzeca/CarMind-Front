import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaintenanceMainComponent } from './maintenance-main.component';


describe('MaintenanceMainComponent', () => {
  let component: MaintenanceMainComponent;
  let fixture: ComponentFixture<MaintenanceMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
