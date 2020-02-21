
import { Injectable } from '@angular/core';

declare let alertify: any;

@Injectable({
  providedIn: 'root'
})

export class AlertifyService {

  constructor() { }

  confirm(message: string, okCallback: () => any) {
    alertify.confirm(message, function(e) {
      if (e) {
          okCallback();
      } else {

      }
    });
  }

  success(message: string) {
    alertify.alert('Operación Exitosa', message, function() { alertify.success(message); });
  }

  error(message: string ) {
    alertify.alert('Mensaje de Error', message, function() { alertify.error(message); });
  }

  warning(message: string) {
    alertify.warning(message).setting('modal',  false);
  }

  message(message: string ) {
    alertify.message(message);
  }

}
