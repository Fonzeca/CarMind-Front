import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCarrouselComponent } from './login-carrousel.component';

describe('LoginCarrouselComponent', () => {
  let component: LoginCarrouselComponent;
  let fixture: ComponentFixture<LoginCarrouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginCarrouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginCarrouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
