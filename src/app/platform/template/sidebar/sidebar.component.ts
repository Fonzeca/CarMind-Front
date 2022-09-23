import {
  AfterViewChecked, Component, ElementRef,
  OnInit,
  Renderer2,
  RendererStyleFlags2,
  ViewChild
} from '@angular/core';
import { BaseComponent } from '../../shared/components/base.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent extends BaseComponent implements OnInit, AfterViewChecked {
  @ViewChild('asToggle',{static: true}) public toggle!: ElementRef;
  @ViewChild('asRigth') toggleRigth!: ElementRef;
  @ViewChild('asRigthPersonal') toggleRigthPersonal!: ElementRef;

  firstActiveMenu : boolean = false

  constructor(private renderer2: Renderer2) {
    super()
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
    if(asToggle)  this.renderer2.setStyle(asToggle, 'width', '300px',  RendererStyleFlags2.Important + RendererStyleFlags2.DashCase);
    if(asRigth) this.renderer2.setStyle(asRigth, 'margin-left', '300px');

    // this.renderer2.setStyle(asRigthPersonal, 'margin-left', '800px');
  }

  cerrarSidebar() {
    const asRigth = document.querySelector(".clase-padre")
    const asToggle = this.toggle.nativeElement;
    if(asToggle) this.renderer2.setStyle(asToggle, 'width', '100px',  RendererStyleFlags2.Important + RendererStyleFlags2.DashCase);
    if(asRigth) this.renderer2.setStyle(asRigth, 'margin-left', '100px');
    // this.renderer2.setStyle(asRigthPersonal, 'margin-left', '300px');

  }

  ngOnInit(): void {

  }

}
