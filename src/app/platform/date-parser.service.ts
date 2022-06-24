import { Injectable } from "@angular/core";
import { NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

@Injectable(
  {providedIn:'root'}
)
export class NgbDateFRParserFormatter extends NgbDateParserFormatter {
    private dateSeparatorChar: string = "-";

    private dateFormat = `yyyy${this.dateSeparatorChar}MM${this.dateSeparatorChar}dd`;
    
    parse(value: string): NgbDateStruct | null{ //parse receive your string dd/mm/yyy
         //return a NgbDateStruct
         //calculate year,month and day from "value"
         if (value === "") {
            return null;
          }
         
          const dateString: string = value;
          const dateValues = dateString.split(this.dateSeparatorChar);
         
          if (dateValues.length !== 3) {
            return null;
          }
         
          let dayIndex: number;
          let yearIndex: number;
         
          if (this.dateFormat === "dd-MM-yyyy") {
            dayIndex = 0;
            yearIndex = 2;
          } else {
            dayIndex = 2;
            yearIndex = 0;
          }
         
          const year = Number(dateValues[yearIndex]);
          const month = Number(dateValues[1]);
          const day = Number(dateValues[dayIndex]);
        return {year:year,month:month,day:day}
    }

    format(date: NgbDateStruct): string { //receive a NgbDateStruct
        //return a string
        if(date){
          const day = date.day.toString().padStart(2, '0');
          const month = date.month.toString().padStart(2, '0');
          const year = date.year.toString();
          return ''+day+'/'+month+'/'+year;
        }
        return ""
    }
}