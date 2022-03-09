import { Pipe, PipeTransform } from '@angular/core';
import { vehicle } from '../interfaces/vehicle';

interface PipeFilterParam {
  term:string;
  empty:any;
  condition:(item:any, term:string)=>{};
}

@Pipe({
  name: 'filterPipe'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args:PipeFilterParam): any {
    if(args?.term){
      const filtred = value.filter((item:any) => args.condition(item, args.term)) ;
      return filtred.length ? filtred : [args.empty];
    }
    return value;
  }

  // condition(item:any, term:string){
  //  const cond = (
  //    item.nombre.toUpperCase().indexOf(term.toUpperCase()) > -1  ||
  //    item.en_uso === true &&  "en uso".toUpperCase().indexOf(term.toUpperCase()) > -1 ||
  //    item.en_uso === false &&  "disponible".toUpperCase().indexOf(term.toUpperCase())  > -1
  //  )
  //  return cond;
  // }

}
