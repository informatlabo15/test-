import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'timeformat'
})
export class TimeformatPipe extends DatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
      return super.transform(value, 'h:mm a');
  }

}
