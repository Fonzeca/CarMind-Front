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

onClick(){
    const asToggle = this.toggle.nativeElement;


if(this.toggleChange){
     this.renderer2.setStyle(asToggle, 'width', '88px')

}
   else{
    this.renderer2.setStyle(asToggle, 'width', '21.3%')


   }

   this.toggleChange = !this.toggleChange;
}



  ngOnInit(): void {
  }



}
