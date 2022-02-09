import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[hover-class]'
})
export class HoverClassDirective {

  constructor(public elementRef:ElementRef, private renderer2: Renderer2) { }
  @Input('hover-class') hoverClass:any;  

  aLink! : HTMLLinkElement

  @HostListener('mouseenter') onMouseEnter() {

    this.aLink = (this.renderer2.parentNode(this.elementRef.nativeElement) as HTMLDivElement).querySelector("."+this.hoverClass) as HTMLLinkElement

    this.aLink.classList.remove(this.hoverClass)

    this.elementRef.nativeElement.classList.add(this.hoverClass);




 }

  @HostListener('mouseleave') onMouseLeave() {
    this.elementRef.nativeElement.classList.remove(this.hoverClass);
    this.aLink.classList.add(this.hoverClass)

  }
}