import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSeccionFormComponent } from './card-seccion-form.component';

describe('CardSeccionFormComponent', () => {
  let component: CardSeccionFormComponent;
  let fixture: ComponentFixture<CardSeccionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSeccionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSeccionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
