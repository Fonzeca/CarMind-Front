import { Pipe, PipeTransform } from '@angular/core';
import { vehicle } from '../interfaces/vehicle';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, term: string): any {
    if(term){
      return value.filter((item:any) => this.condition(item,term));
    }
    return value;
  }

  condition(item:any, term:string){
   const cond = (
     item.nombre.toUpperCase().indexOf(term.toUpperCase()) > -1  ||
     item.en_uso === true &&  "en uso".toUpperCase().indexOf(term.toUpperCase()) > -1 ||
     item.en_uso === false &&  "disponible".toUpperCase().indexOf(term.toUpperCase())  > -1
   )
   return cond;
  }

}
