import { Injectable, signal } from '@angular/core';
import { Dish } from '../models/dish.model';

@Injectable({
  providedIn: 'root'
})
export class AddFormStateService {
  public openAddForm = signal(false);
  public editingDish = signal<Dish | null>(null);

  toggleAddForm(dish?: Dish) {
    if (dish) {
      this.editingDish.set(dish);
      this.openAddForm.set(true);
    } else {
      this.editingDish.set(null);
      this.openAddForm.update(val => !val);
    }
  }
}