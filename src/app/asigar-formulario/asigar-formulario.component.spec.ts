import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsigarFormularioComponent } from './asigar-formulario.component';

describe('AsigarFormularioComponent', () => {
  let component: AsigarFormularioComponent;
  let fixture: ComponentFixture<AsigarFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsigarFormularioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsigarFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
