import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeformat'
})
export class TimeformatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
   return this.transform(value, 'h:mm a');
  }

}
