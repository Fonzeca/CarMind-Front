import {
  AfterViewChecked, Component, ElementRef,
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
export class SidebarComponent implements OnInit, AfterViewChecked {
  @ViewChild('asToggle',{static: true}) public toggle!: ElementRef;
  @ViewChild('asRigth') toggleRigth!: ElementRef;
  @ViewChild('asRigthPersonal') toggleRigthPersonal!: ElementRef;

  firstActiveMenu : boolean = false

  constructor(private renderer2: Renderer2) {

  }
  ngAfterViewChecked(): void {
    if(!this.firstActiveMenu && document.querySelector(".active")){
      document.querySelector(".active")?.classList.add("item-active-menu")

      this.firstActiveMenu = true;
    }
  }
  ngAfterContentInit(): void {

  }

  abrirSidebar() {
    if(window.outerWidth < 1000){
      return;
    }


    const asRigth = document.querySelector(".clase-padre")
    const asToggle = this.toggle.nativeElement;
    const asRigthPersonal = document.querySelector(".personal-padre")
    this.renderer2.setStyle(asToggle, 'width', '300px',  RendererStyleFlags2.Important + RendererStyleFlags2.DashCase);
    this.renderer2.setStyle(asRigth, 'margin-left', '300px');

    this.renderer2.setStyle(asRigthPersonal, 'margin-left', '800px');
  }

  cerrarSidebar() {
    const asRigth = document.querySelector(".clase-padre")
    const asToggle = this.toggle.nativeElement;
    const asRigthPersonal = document.querySelector(".personal-padre")
    this.renderer2.setStyle(asToggle, 'width', '102px',  RendererStyleFlags2.Important + RendererStyleFlags2.DashCase);
    this.renderer2.setStyle(asRigth, 'margin-left', '100px');
    this.renderer2.setStyle(asRigthPersonal, 'margin-left', '300px');

  }

  ngOnInit(): void {

  }


}
