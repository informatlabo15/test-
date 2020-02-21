import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateformat'
})
export class DateformatPipe  extends DatePipe implements PipeTransform {

  transform(value: any , args?: any): any {
//        var datePipe = new DatePipe("en-US");
//         value = datePipe.transform(value, 'dd/MM/yyyy');
//         return value;
      return super.transform(value, 'yyyy-MM-dd');
    }

}
