import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  RendererStyleFlags2,
  ViewChild,
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

  /* toggleChange!: boolean; */

  constructor(private renderer2: Renderer2) {}

 /*  onClick() {
    const asToggle = this.toggle.nativeElement;
    const asRigth = this.toggleRigth.nativeElement;
    const asButtonLeft = this.toggleButtonLeft.nativeElement;
    const asButtonRigth = this.toggleButtonRigth.nativeElement;
    const asImgMovie = this.toggleImgMovie.nativeElement;

    if (this.toggleChange) {
      this.renderer2.setStyle(asToggle, 'width', '88px');
      this.renderer2.setStyle(asRigth, 'margin-left', '0px');
      this.renderer2.setStyle(asButtonLeft, 'right', '270px');
      this.renderer2.setStyle(asButtonRigth, 'left', '315px');
      this.renderer2.removeClass(asButtonLeft, 'pepito');
      this.renderer2.removeClass(asButtonRigth, 'susano');
      this.renderer2.removeClass(asButtonLeft, 'naruto');
      this.renderer2.removeClass(asButtonRigth, 'sasuke');
      this.renderer2.removeClass(asImgMovie, 'search-movie');
    } else {
      this.renderer2.setStyle(asToggle, 'width', '21.3%');
      this.renderer2.setStyle(asRigth, 'margin-left', '300px');
      this.renderer2.setStyle(asButtonLeft, 'right', '290px');
      this.renderer2.setStyle(asButtonRigth, 'left', '310px');
      this.renderer2.addClass(asButtonLeft, 'pepito');
      this.renderer2.addClass(asButtonRigth, 'susano');
      this.renderer2.addClass(asButtonLeft, 'naruto');
      this.renderer2.addClass(asButtonRigth, 'sasuke');
      this.renderer2.addClass(asImgMovie, 'search-movie');
      this.renderer2.addClass(asRigth, 'clase-cualquiera');
      this.renderer2.addClass(asRigth, 'otra-clase');
    }

    this.toggleChange = !this.toggleChange;
  } */

  abrirSidebar() {
    const asRigth = this.toggleRigth.nativeElement;
    const asToggle = this.toggle.nativeElement;
    const asButtonLeft = this.toggleButtonLeft.nativeElement;
    const asButtonRigth = this.toggleButtonRigth.nativeElement;
    const asImgMovie = this.toggleImgMovie.nativeElement;
    this.renderer2.setStyle(asToggle, 'width', '21.3%',  RendererStyleFlags2.Important + RendererStyleFlags2.DashCase);
    this.renderer2.setStyle(asRigth, 'margin-left', '300px');
    this.renderer2.setStyle(asButtonLeft, 'right', '270px');
    this.renderer2.setStyle(asButtonRigth, 'left', '300px');
    this.renderer2.addClass(asButtonLeft, 'button-left');
    this.renderer2.addClass(asButtonRigth, 'button-right');
    this.renderer2.addClass(asButtonLeft, 'naruto');
    this.renderer2.addClass(asButtonRigth, 'sasuke');
    this.renderer2.addClass(asImgMovie, 'search-movie');
    this.renderer2.addClass(asRigth, 'clase-cualquiera');
    this.renderer2.addClass(asRigth, 'otra-clase');
    this.renderer2.removeClass(asButtonLeft, 'class-nueva')
    this.renderer2.removeClass(asButtonRigth, 'class-nueva-2')
    this.renderer2.removeClass(asImgMovie, 'class-nueva-3');


  }

  cerrarSidebar() {
    const asToggle = this.toggle.nativeElement;
    const asRigth = this.toggleRigth.nativeElement;
    const asButtonLeft = this.toggleButtonLeft.nativeElement;
    const asButtonRigth = this.toggleButtonRigth.nativeElement;
    const asImgMovie = this.toggleImgMovie.nativeElement;
    this.renderer2.setStyle(asToggle, 'width', '88px',  RendererStyleFlags2.Important + RendererStyleFlags2.DashCase);
    this.renderer2.setStyle(asRigth, 'margin-left', '100px');
    this.renderer2.setStyle(asButtonLeft, 'right', '270px');

      this.renderer2.setStyle(asButtonRigth, 'left', '300px');
      this.renderer2.removeClass(asButtonLeft, 'button-left');
      this.renderer2.removeClass(asButtonRigth, 'susano');
      this.renderer2.removeClass(asButtonLeft, 'naruto');
      this.renderer2.removeClass(asButtonRigth, 'sasuke');
      this.renderer2.removeClass(asImgMovie, 'search-movie');
      this.renderer2.addClass(asButtonLeft, 'class-nueva');
      this.renderer2.addClass(asButtonRigth, 'class-nueva-2');
      this.renderer2.addClass(asImgMovie, 'class-nueva-3');



  }

  cambiarIndicator(ele: HTMLElement) {}

  ngOnInit(): void {}
}
