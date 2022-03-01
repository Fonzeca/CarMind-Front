import { Directive, Renderer2 } from '@angular/core';
import { ElementRef } from '@angular/core';

@Directive({
  selector: '[mprogress]',
})
export class MProgressDirective {
  constructor(public elRef: ElementRef, renderer: Renderer2) {
  }
  ngOnInit(){
    this.elRef.nativeElement.style.backgroundColor = "green";
		this.elRef.nativeElement.style.color = "blue";

  }
}
