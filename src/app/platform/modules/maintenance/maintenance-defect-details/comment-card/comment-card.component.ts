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
        return "hace " + hoursDiff + ((hoursDiff !== "1") ? " horas " : " hora ") + minDiff + ((minDiff !== "1") ? " minutos" : " minuto");
      } 
      
      if(minDiff != "0"){
        return "hace " + minDiff + ((minDiff !== "1") ? " minutos" : " minuto") 
      }         
      
      return "hace unos instantes";
    }else if (daysDiff <= 7){
      return "hace " + daysDiff +  ((daysDiff != 1) ? " días " : " día") + hoursDiff + ((hoursDiff !== "1") ? " horas" : " hora");
    }else{
      return this.getFechaAsString(commentDate);
    }
  }

  getDifferenceInHours(diff : number){
    return Math.floor((diff / 36e5 * 1)).toString()
  }

  getDifferenceInMinutes(diff : number, hours : number){
    return Math.floor(((diff / 36e5 * 60) - (60*hours))).toString()
  }

  getFechaAsString(fecha : any){
    var date : string = fecha.toISOString().substring(0,10);
    var time : string = fecha.toTimeString().substring(0,8);
    return date + " " + time;
  }


}
