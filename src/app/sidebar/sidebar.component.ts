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
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @ViewChild('asToggle',{static: true}) public toggle!: ElementRef;
  @ViewChild('asRigth') toggleRigth!: ElementRef;
  @ViewChild('asButtonRigth') toggleButtonRigth!: ElementRef;
  @ViewChild('asButtonLeft') toggleButtonLeft!: ElementRef;
  @ViewChild('asImgMovie') toggleImgMovie!: ElementRef;
  @ViewChild('asTextLeft') toggleMarginLeft!: ElementRef;
  @ViewChild('indicator') indicator!: ElementRef;
  @ViewChild('asIconLeft') toggleIconLeft!: ElementRef;
  @ViewChild('asIconRigth') toggleIconRigth!: ElementRef;


  constructor(private renderer2: Renderer2) {}

  abrirSidebar() {
    if(window.outerWidth < 1000){
      return;
    }


    const asRigth = document.querySelector(".clase-padre")
    const asButtonLeft = document.querySelector(".button")
    const asButtonRigth = document.querySelector(".input-search")
    const asToggle = this.toggle.nativeElement;
    const asCard3 = document.querySelector(".card-3")
    const asCard2 = document.querySelector(".card-2")
    const asTextLeft = document.querySelector(".title-vehiculo")
    const asImgMovie = document.querySelector(".img-search")
    const asIconLeft = document.querySelector(".a-icon-lista")
    const asIconRigth = document.querySelector(".a-icon-cuadricula")
    this.renderer2.setStyle(asToggle, 'width', '21.3%',  RendererStyleFlags2.Important + RendererStyleFlags2.DashCase);

    this.renderer2.setStyle(asRigth, 'margin-left', '300px');
    this.renderer2.addClass(asButtonLeft, 'asButtonLeft');
    this.renderer2.addClass(asTextLeft, 'asTextLeft');
    this.renderer2.addClass(asButtonRigth, 'asButtonRigth');
    this.renderer2.addClass(asImgMovie, 'asImgMovie');
    this.renderer2.addClass(asIconLeft, 'asIconLeft');
    this.renderer2.addClass(asIconRigth, 'asIconRigth');


  }

  cerrarSidebar() {
    const asRigth = document.querySelector(".clase-padre")
    const asButtonLeft = document.querySelector(".button")
    const asButtonRigth = document.querySelector(".input-search")
    const asToggle = this.toggle.nativeElement;
    const asTextLeft = document.querySelector(".title-vehiculo")
    const asImgMovie = document.querySelector(".img-search")
    const asIconLeft = document.querySelector(".a-icon-lista")
    const asIconRigth = document.querySelector(".a-icon-cuadricula")
    this.renderer2.setStyle(asToggle, 'width', '102px',  RendererStyleFlags2.Important + RendererStyleFlags2.DashCase);
    this.renderer2.setStyle(asRigth, 'margin-left', '100px');
    this.renderer2.removeClass(asButtonLeft, 'asButtonLeft');
    this.renderer2.removeClass(asTextLeft, 'asTextLeft');
    this.renderer2.removeClass(asButtonRigth, 'asButtonRigth');
    this.renderer2.removeClass(asImgMovie, 'asImgMovie');
    this.renderer2.removeClass(asIconLeft, 'asIconLeft');
    this.renderer2.removeClass(asIconRigth, 'asIconRigth');

  }

  cambiarIndicator(ele: HTMLElement) {}

  ngOnInit(): void {}
}
