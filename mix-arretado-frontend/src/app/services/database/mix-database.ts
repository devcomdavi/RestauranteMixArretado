import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DishService } from '../dish-service';
import { environment } from '../../../environments/environment';
import { Dish } from '../../models/dish.model';
@Injectable({
  providedIn: 'root',
})
export class MixDatabase {
  private api = inject(HttpClient);
  private apiUrl = environment.supabase.apiUrl;
  private apiKey = environment.supabase.apiKey;

  private get headers() {
    return {
      'apiKey': this.apiKey,
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    };
  }

  public read(): Observable<Dish[] | null> {
    return this.api.get<Dish[]>(`${this.apiUrl}/dish`, {
      headers: this.headers
    });
  }
}
