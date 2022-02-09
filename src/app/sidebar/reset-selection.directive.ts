import { AfterViewChecked, Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[item-menu]'
})
export class ResetSelectionDirective implements AfterViewChecked{

  indicator!: HTMLDivElement;
  static initElement : Element | null;

  constructor(private el: ElementRef) {
    
  }

  ngAfterViewChecked(): void {
    if(!ResetSelectionDirective.initElement){
      this.indicator = document.querySelector("#indication-mark-wrap") as HTMLDivElement;
      ResetSelectionDirective.initElement = document.querySelector(".item-active-menu");
      this.moveIndicator();
    }
  }
  
  @HostListener("mouseenter") onMouseEnter() {

    var rect = this.el.nativeElement.getBoundingClientRect();
    
    this.indicator.style.top = (rect.top-68).toString()+"px";
    this.indicator.style.left = "0px"
    this.indicator.style.height = rect.height.toString()+"px";
    
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.moveIndicator();
  }

  private moveIndicator(){
    if(ResetSelectionDirective.initElement){
      var rect = (ResetSelectionDirective.initElement.firstChild as HTMLDivElement).getBoundingClientRect();

      this.indicator.style.top = (rect.top-68).toString()+"px";
      this.indicator.style.left = "0px"
      this.indicator.style.height = rect.height.toString()+"px";
    }
  }

}
