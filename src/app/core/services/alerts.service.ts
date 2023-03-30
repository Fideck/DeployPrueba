import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  constructor() {}
  alertError(error: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error,
    });
  }
  alertSucces(title: string): void {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 1200,
    });
  }
}
