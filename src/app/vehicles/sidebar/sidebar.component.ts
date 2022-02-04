import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @ViewChild('asToggle') toggle!: ElementRef;

  toggleChange!: boolean

  constructor(private renderer2: Renderer2) { }

  

  onClick() {
    

  }

  entraMouse(){
    const asToggle = this.toggle.nativeElement;
    this.renderer2.setStyle(asToggle, 'width', '250px')
  }
  saleMouse(){
    const asToggle = this.toggle.nativeElement;
    this.renderer2.setStyle(asToggle, 'width', '88px')
  }

  ngOnInit(): void {
  }



}
