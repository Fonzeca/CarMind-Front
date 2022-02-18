import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatoRespuestaComponent } from './formato-respuesta.component';

describe('FormatoRespuestaComponent', () => {
  let component: FormatoRespuestaComponent;
  let fixture: ComponentFixture<FormatoRespuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormatoRespuestaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatoRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
