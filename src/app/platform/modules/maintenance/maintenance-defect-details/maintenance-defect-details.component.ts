import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription, timer } from 'rxjs';
import { Comentario, CreateComentario, Defect } from 'src/app/platform/interfaces/maintenance';
import { AuthService } from 'src/app/platform/services/auth.service';
import { MaintenanceService } from 'src/app/platform/services/maintenance.service';
import { UsersService } from 'src/app/platform/services/users.service';
import { BaseComponent } from 'src/app/platform/shared/components/base.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-maintenance-defect-details',
  templateUrl: './maintenance-defect-details.component.html',
  styleUrls: ['./maintenance-defect-details.component.scss']
})
export class MaintenanceDefectDetailsComponent extends BaseComponent implements OnInit {

  commentText: string = '';

  defect: Defect | undefined;
  comments: Comentario[] | undefined;
  public images?: any[];

  getCommentsEvery1minute :  Subscription | undefined;

  hasToScroll : boolean = true;

  @ViewChild('scrollComments') private scrollComments: ElementRef | undefined;

  public prioritys = [
    "Indefinida",
    "Baja",
    "Media",
    "Alta",
  ];
  _priority:string = 'Indefinida';
  set priority (value:any){
    this._priority = value;

  }
  get priority(){
    return this._priority;
  }

  
  flicker: Subject<any> = new Subject();
  slideIndex: number = 0;
  slideCant: number = 4;

  constructor(public router: Router, public maintenanceService: MaintenanceService, public authService : AuthService) {
    super();

    if (router.getCurrentNavigation() === null || router.getCurrentNavigation()!.extras.state! === undefined) {
      router.navigateByUrl(this.getAppRoutes.platform.maintenance.defects.route);
      return;
    } else {
      this.defect = this.router.getCurrentNavigation()!.extras.state!['defect'];
      this.priority = this.prioritys[this.defect!.prioridad];
    }



    this.getCommentsEvery1minute = timer(0, 60000).subscribe(_ => {
      this.maintenanceService.getCommentsByTopicAndTopicId('defecto', this.defect!.id.toString()).subscribe(response => {
        if(this.comments === undefined){
          this.hasToScroll = true;
        }else if(this.comments.length != response.length){
          this.hasToScroll = true;
        }
        this.comments = response;
      });
    });
  }

  ngOnInit(): void {
  }
  
  ngAfterViewChecked() {
    if (this.hasToScroll) this.scrollToBottom();
  } 

  override ngOnDestroy(): void {
    this.getCommentsEvery1minute?.unsubscribe();
    this.maintenanceService.updateFechaLabelEvery1Second?.unsubscribe();
    this.maintenanceService.updateFechaLabelEvery1Second = undefined;
  }

  onPriorityChange(newPriority : string){
    var newPriorityIndex = this.prioritys.indexOf( newPriority);
    this.maintenanceService.updatePriorityDefectById(this.defect!.id.toString(), newPriorityIndex).subscribe();
  }

  onUpdateState(newState : string){
    this.maintenanceService.updateStateDefectById(this.defect!.id.toString(), newState).subscribe(
      _ => {
        this.defect!.estado = newState;
      }
    );
  }

  onCommentSend(){

    if(this.commentText.length <= 0){
      return;
    }

    if(this.commentText.length > 300){
      Swal.fire({
        title: 'Comentario demasiado largo',
        text: "El comentario no puede tener más de 300 caracteres",
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      return;
    }

    var newComment : CreateComentario = {
      usuario_id: this.authService.user!.id,
      usuario: this.authService.user!.nombre + ' ' + this.authService.user!.apellido,
      mensaje: this.commentText,
      tema: "defecto",
      tema_id: this.defect!.id
    }
    this.maintenanceService.createComment(newComment).subscribe(
      _ =>{
        this.commentText = '';
        this.maintenanceService.getCommentsByTopicAndTopicId('defecto', this.defect!.id.toString()).subscribe(response => {
          this.comments = response;
          this.hasToScroll = true;
          }
          )}
    );
  
  }

  getFecha(fecha : any){
    var date : string = fecha.toISOString().substring(0,10);
    var time : string = fecha.toTimeString().substring(0,8);
    return date + " " + time;
  }

  getStateColor(state : string){
    if(state === "Pendiente") return "#FFC350";
    if(state === "En progreso") return "#3ADCFF";
    return "#62FF3A";
  }

  viewImage(image:any){
    console.log("viewing image")
  }

  getImageSlider(images:any) {
    return images.slice(this.slideIndex, this.slideIndex + this.slideCant);
  }

  nextSlide(image:any) {
    if ((this.slideIndex+this.slideCant) !== image.length &&  image.length!==1) {
      this.slideIndex++;
      this.flikear();
    }
  }

  previousSlide() {
    if (this.slideIndex !== 0) {
      this.slideIndex--;
      this.flikear();
    }
  }

  flikear() {
    setTimeout(() => this.flicker.next(null), 0);
  }

  scrollToBottom(): void {
    if(this.scrollComments) this.scrollComments.nativeElement.scrollTop = this.scrollComments.nativeElement.scrollHeight;
    this.hasToScroll = false;
  }
            
}
