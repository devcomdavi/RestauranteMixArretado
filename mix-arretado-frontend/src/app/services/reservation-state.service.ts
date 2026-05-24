import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationStateService {
  public openForm = signal(false);

  toggleForm() {
    this.openForm.update(val => !val);
  }

}
