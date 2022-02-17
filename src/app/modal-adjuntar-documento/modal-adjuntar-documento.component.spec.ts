import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdjuntarDocumentoComponent } from './modal-adjuntar-documento.component';

describe('ModalAdjuntarDocumentoComponent', () => {
  let component: ModalAdjuntarDocumentoComponent;
  let fixture: ComponentFixture<ModalAdjuntarDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAdjuntarDocumentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAdjuntarDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
