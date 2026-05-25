import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Dish } from '../models/dish.model';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  private api = inject(HttpClient);
  private apiUrl = environment.supabase.apiUrl;
  private apiKey = environment.supabase.apiKey;

  constructor() {
    this.load();
  }
  
  private get headers() {
    return {
      'apiKey': this.apiKey,
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    };
  }

  public load(): void {
      this.api.get<Dish[]>(`${this.apiUrl}/dish`, {
        headers: this.headers
      }).subscribe({
        next: (dishes) => {
          this._dishes.set(dishes);
        }
      });
  }

  private _dishes = signal<Dish[] | null>([]);

  get dishes() {
    return this._dishes.asReadonly();
  }

  public create(newDish: Dish) {
    this.api.post<Dish[]>(`${this.apiUrl}/dish`, newDish, {
      headers: this.headers
    }).subscribe({
      next: (response) => {
        const createdDish = Array.isArray(response) ? response[0] : response;
        
        if (createdDish && createdDish.id !== undefined) {
           this._dishes.set( [...this._dishes() ?? [], createdDish] );
        } else {
           this.load();
        }
      }
    });
  }

  public removeById(id: number) {
    const filteredDishes = this._dishes()?.filter(
      elem => elem.id !== id
    );

    this._dishes.set(filteredDishes ?? null);

    this.api.delete(`${this.apiUrl}/dish?id=eq.${id}`, {
      headers: this.headers
    }).subscribe();
  }
}
