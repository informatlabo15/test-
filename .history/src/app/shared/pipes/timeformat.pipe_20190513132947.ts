import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeformat'
})
export class TimeformatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
    // return super.transform(value, 'yyyy-MM-dd');
  }

}
