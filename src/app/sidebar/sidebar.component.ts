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
    this.renderer2.setStyle(asToggle, 'width', '21.3%',  RendererStyleFlags2.Important + RendererStyleFlags2.DashCase);
    this.renderer2.setStyle(asRigth, 'margin-left', '300px');

  }

  cerrarSidebar() {
    const asRigth = document.querySelector(".clase-padre")
    const asToggle = this.toggle.nativeElement;
    this.renderer2.setStyle(asToggle, 'width', '102px',  RendererStyleFlags2.Important + RendererStyleFlags2.DashCase);
    this.renderer2.setStyle(asRigth, 'margin-left', '100px');

  }

  ngOnInit(): void {
    
  }

  
}
