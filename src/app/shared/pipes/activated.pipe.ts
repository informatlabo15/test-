import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activated'
})
export class ActivatedPipe implements PipeTransform {

  transform(value: any): any {
     return value ? '<i class="fa fa-toggle-on activated" aria-hidden="true"></i>' : '<i class="fa fa-toggle-off" aria-hidden="true"></i>';
  }

}
