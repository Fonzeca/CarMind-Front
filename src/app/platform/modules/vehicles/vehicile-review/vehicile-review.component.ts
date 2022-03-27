import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalComponent } from 'src/app/platform/components/modal/modal.component';
import { Review } from 'src/app/platform/interfaces/review';
import { vehicle } from 'src/app/platform/interfaces/vehicle';
import { vehicleByIdResponse, VehiclesService } from 'src/app/platform/services/vehicles.service';
import { BaseComponent } from 'src/app/platform/shared/components/base.component';
import { QrModalComponent } from '../shared/qr-modal/qr-modal.component';

@Component({
  selector: 'app-vehicile-review',
  templateUrl: './vehicile-review.component.html',
  styleUrls: ['./vehicile-review.component.scss']
})
export class VehicileReviewComponent extends BaseComponent implements OnInit {

  vehicle!: vehicle;

  columns:number = 2;

  public vehicleQrCode?: string;

  public pendingToReview?: any[] = []; // Revisiones pendientes

  public note?:string;


  public review_id = "";

  constructor(public _vehicle: VehiclesService,  public activatedRoute:ActivatedRoute, public dialog: MatDialog,
      public router:Router
    ) {
    super()
  }

  ngOnInit(): void {
    this.addSafeSubscription(
      this.activatedRoute.params
      .subscribe((param:Params)=>{
        if(param["id"]){
          if(param["review_id"]) {
            this.review_id = param["review_id"];
          }
          this.getById(param["id"]);
        }
      })
    );
  }

  getById(id:number){
    this.addSafeSubscription(
      this._vehicle.getById(id)
      .subscribe((data:vehicleByIdResponse)=>{
        this.vehicle = data.vehicle;
        if(this.review_id){
          const { logs, nota } = data.recentReviews.find(data=> data.id === parseInt(this.review_id));
          this.pendingToReview = logs;
          this.note = nota;
        }else{
          this.pendingToReview = data.formsPendingToReview;
        }

        this.vehicleQrCode = `CarMind-vehiculo=${this.vehicle.id}-CarMind`;
      })
    );
  }

  qrCode() {
    this.dialog.open(ModalComponent, {
      width: '280px;',
      height: 'auto',
      panelClass: ['md:w-3/5', 'w-full'],
      maxHeight: '85vh',
      data: {
        viewComponent: {
          component: QrModalComponent,
          data: {
            qr: this.vehicleQrCode
          },
        },
        title: 'QR del Vehículo',
      },
    }).afterClosed().subscribe(res=> this.getById(this.vehicle.id));
  }

  create(){
    if(this.note){
      const data: Review = {
        vehiculo_id: this.vehicle.id,
        nota: this.note
      };
      this._vehicle.createReview(data).subscribe(()=>{
        this.router.navigateByUrl(this.getAppRoutes.platform.vehicles.route+"/"+this.vehicle.id)
      });
    }
  }

}
