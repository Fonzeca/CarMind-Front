import { Component, Input, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { Comentario } from 'src/app/platform/interfaces/maintenance';
import { MaintenanceService } from 'src/app/platform/services/maintenance.service';

@Component({
  selector: 'comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {

  @Input() comment : Comentario | undefined;

  isUpdatingFechaLabel : boolean = false;

  constructor(public maintenanceService: MaintenanceService) { }

  ngOnInit(): void {
  }


  getDateInformation(fecha : any | undefined){
    fecha = fecha.replace('T',' ').replace('Z','')

    var commentDate : Date = new Date(fecha);
    var currentDate : Date = new Date();

    var diff = Math.abs(commentDate.getTime() - currentDate.getTime());
    var daysDiff = Math.round(diff / (1000 * 3600 * 24)); 
    var hoursDiff : string = this.getDifferenceInHours(diff)
    
    if (daysDiff == 0){
      var minDiff : string = this.getDifferenceInMinutes(diff, +hoursDiff);
      if (hoursDiff != "0"){
        this.stopFechaLabelUpdate()
        return "hace " + hoursDiff + ((hoursDiff !== "1") ? " horas " : " hora ") + minDiff + ((minDiff !== "1") ? " minutos" : " minuto");
      } 
      
      var secondsDiff : string = this.getDifferenceInSeconds(diff, +hoursDiff, +minDiff);
      if(minDiff != "0"){
        this.stopFechaLabelUpdate()
        return "hace " + minDiff + ((minDiff !== "1") ? " minutos" : " minuto") 
      } 

      if(!this.maintenanceService.updateFechaLabelEvery1Second){
        this.isUpdatingFechaLabel = true;
        this.maintenanceService.updateFechaLabelEvery1Second = timer(0, 1000).subscribe(_ => this.getDateInformation(fecha));
      } 
        
      
      return "hace " + secondsDiff + ((secondsDiff !== "1") ? " segundos" : " segundo")
    }else if (daysDiff <= 7){
      this.stopFechaLabelUpdate()
      return "hace " + daysDiff +  ((daysDiff != 1) ? " días " : " día") + hoursDiff + ((hoursDiff !== "1") ? " horas" : " hora");
    }else{
      this.stopFechaLabelUpdate()
      return this.getFechaAsString(commentDate);
    }
  }

  stopFechaLabelUpdate(){
    if(this.isUpdatingFechaLabel && this.maintenanceService.updateFechaLabelEvery1Second) this.maintenanceService.updateFechaLabelEvery1Second.unsubscribe();
    
  }

  getDifferenceInHours(diff : number){
    return Math.floor((diff / 36e5 * 1)).toString()
  }

  getDifferenceInMinutes(diff : number, hours : number){
    return Math.floor(((diff / 36e5 * 60) - (60*hours))).toString()
  }

  getDifferenceInSeconds(diff : number, hours : number, minutes : number){
    return Math.floor(((diff / 36e5 * 3600) - (3600*hours) - (60*minutes))).toString()
  }

  getFechaAsString(fecha : any){
    var date : string = fecha.toISOString().substring(0,10);
    var time : string = fecha.toTimeString().substring(0,8);
    return date + " " + time;
  }


}
