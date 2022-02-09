import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  RendererStyleFlags2,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @ViewChild('asToggle',{static: true}) public toggle!: ElementRef;
  @ViewChild('asRigth') toggleRigth!: ElementRef;
  @ViewChild('asButtonRigth') toggleButtonRigth!: ElementRef;
  @ViewChild('asButtonLeft') toggleButtonLeft!: ElementRef;
  @ViewChild('asImgMovie') toggleImgMovie!: ElementRef;
  @ViewChild('asMarginLeft') toggleMarginLeft!: ElementRef;
  @ViewChild('indicator') indicator!: ElementRef;


  constructor(private renderer2: Renderer2) {}

  abrirSidebar() {
    if(window.outerWidth < 1000){
      return;
    }

    const asRigth = document.querySelector(".clase-padre")
    const asToggle = this.toggle.nativeElement;
    this.renderer2.setStyle(asToggle, 'width', '21.3%',  RendererStyleFlags2.Important + RendererStyleFlags2.DashCase);
    this.renderer2.setStyle(asRigth, 'margin-left', '300px');

  }

  cerrarSidebar() {
    const asToggle = this.toggle.nativeElement;
    const asRigth = document.querySelector(".clase-padre")
    this.renderer2.setStyle(asToggle, 'width', '102px',  RendererStyleFlags2.Important + RendererStyleFlags2.DashCase);
    this.renderer2.setStyle(asRigth, 'margin-left', '100px');

  }

  cambiarIndicator(ele: HTMLElement) {}

  ngOnInit(): void {}
}
