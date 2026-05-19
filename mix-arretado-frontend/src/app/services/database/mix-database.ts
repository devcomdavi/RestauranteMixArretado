import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

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
    return this.api.get(`${this.apiUrl}/dish`, {
      headers: this.headers
    });
  }
}
