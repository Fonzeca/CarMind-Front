import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalDirective } from '../../directives/ad.directive';
import { Type } from '@angular/core';

export class viewComponent {
  constructor(public component: Type<any>, public data: any) {}
}

export interface DialogData {
  viewComponent:dyComponent
  title:string,
  data:any,
  buttons:button[],
}

export interface button {
  event:()=>{};
  label:string;
}

export interface dyComponent {
  data: any;
}


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {


  // buttons : button[] = [];
  title:string = "title";

  @ViewChild(ModalDirective, {static: true}) modalHost!:ModalDirective;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    // this.buttons = this.data.buttons;
    this.title = this.data.title;
    this.loadComponent()
  }

  loadComponent() {
    const viewContainerRef = this.modalHost.viewContainerRef;
    viewContainerRef.clear();
    this.data.viewComponent;

    const componentRef = viewContainerRef.createComponent<dyComponent>((<any>this.data.viewComponent).component);
    componentRef.instance.data = (<any>this.data.viewComponent).data;
  }

}
