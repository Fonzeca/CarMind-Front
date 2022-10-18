import { Pipe, PipeTransform } from '@angular/core';
import { vehicle } from '../interfaces/vehicle';

interface PipeFilterParam {
  term:string;
  empty:any;
  condition:(item:any, term:string)=>{};
}

@Pipe({
  name: 'filterPipeS'
})
export class FilterPipeS implements PipeTransform {

  transform(items: any[], keyword: any, properties: string[]): any[] {
    if (!items) return [];
    if (!keyword) return items;
    return items.filter(item => {
      var itemFound: any;
      for (let i = 0; i < properties.length; i++) {
        if (item[properties[i]].toString().toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
          itemFound = true;
          break;
        }
      }
      return itemFound;
    });

  }

}
