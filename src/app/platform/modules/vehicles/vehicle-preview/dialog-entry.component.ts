import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ModalComponent } from "src/app/platform/components/modal/modal.component";
import { ViewFormModalComponent } from "../../forms/shared/view-form-modal/view-form-modal.component";

@Component({
  template: ''
})
export class DialogEntryComponent {
  constructor(public dialog: MatDialog, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe((param:Params)=>{
      this.openDialog(param["id"]);
    })
  }


  openDialog(id: number|string): void {

    const dialogRef = this.dialog.open(ModalComponent, {
      width: '280px;',
      height: 'auto',
      panelClass: ['md:w-3/5', 'w-full'],
      maxHeight: '85vh',
      data: {
        viewComponent: {
          component: ViewFormModalComponent,
          data: {
            id,
            close: () => {
              this.dialog.closeAll();
            },
          },
        },
        title: 'Formulario',
      },
    })
    dialogRef.afterClosed().subscribe(result => {
        this.router.navigate(['../../'], { relativeTo: this.route });
    });
  }
}
