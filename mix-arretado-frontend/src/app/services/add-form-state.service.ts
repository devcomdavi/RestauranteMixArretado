import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddFormStateService {
  public openAddForm = signal(false);

  toggleAddForm() {
    this.openAddForm.update(val => !val);
  }
}
