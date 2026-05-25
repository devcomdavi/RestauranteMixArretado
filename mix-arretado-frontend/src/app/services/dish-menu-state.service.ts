import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DishMenuStateService {
  public openEditId = signal<number | null>(null);

  editDish(id: number | null) {
    this.openEditId.set(id);
  }
}