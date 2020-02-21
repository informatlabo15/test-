import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(array: Array<any>, prop: string): Array<any> {
    return array.sort((a, b) => {
      prop.split('.').forEach(p => {
        a = a[p];
        b = b[p];
      });

      return (a > b) ? 1 : ((b > a) ? -1 : 0);
    });
  }

}
