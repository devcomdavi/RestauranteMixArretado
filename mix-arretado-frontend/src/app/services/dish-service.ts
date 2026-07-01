import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dish } from '../models/dish.model';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  private api = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/pratos';
  
  private categoryMap: { [key: string]: number } = {
    'tapioca-arretada': 27,
    'jantar': 24,
    'cuscuz': 26,
    'tapioquinha': 19,
    'sanduiches': 20,
    'sanduiches-especiais': 23,
    'pasteis-salgados': 28,
    'pasteis-doces': 25,
    'sobremesas': 18,
    'adicionais': 22,
    'sucos': 21,
    'bebidas': 17,
    'Pratos Principais': 1,
    'Bebidas': 2,
    'Sobremesas': 3
  };

  private _dishes = signal<Dish[] | null>([]);

  constructor() {
    this.load();
  }

  get dishes() {
    return this._dishes.asReadonly();
  }

  public load(): void {
    // A API Spring Boot retorna uma lista de 'Prato'. Precisamos mapear para 'Dish' se os nomes das propriedades forem diferentes.
    // Prato model: id, nome, descricao, preco, categoria (objeto Categoria com id, nome).
    // O frontend espera Dish: id, title, description, price, category (string), picture.
    // Vamos assumir que a API foi ajustada ou vamos mapear aqui.
    const pratos$ = this.api.get<any[]>(this.apiUrl);
    const bebidas$ = this.api.get<any[]>('http://localhost:8080/api/bebidas');

    forkJoin([pratos$, bebidas$]).subscribe({
      next: ([pratos, bebidas]) => {
        const mappedPratos: Dish[] = pratos.map(p => ({
          id: p.id,
          title: p.nome,
          description: p.descricao,
          price: p.preco,
          category: p.categoria?.nome || 'Geral',
          picture: p.picture || 'images/template_prato.png',
          type: 'prato'
        }));

        const mappedBebidas: Dish[] = bebidas.map(b => ({
          id: b.id, // ID could collide with Prato if we use it directly, but for now we'll combine them. 
          // Wait, if IDs collide, update/delete will be tricky!
          // But since the frontend uses a single Dish interface and id is a number, we might need a composite ID or type field.
          // For now, let's keep it simple as per original behavior.
          title: b.nome,
          description: b.descricao || b.volume || '',
          price: b.preco,
          category: b.categoria?.nome || 'Bebidas',
          picture: b.picture || 'images/template_prato.png',
          type: 'bebida'
        }));

        this._dishes.set([...mappedPratos, ...mappedBebidas]);
      },
      error: (e) => console.error("Erro ao carregar pratos e bebidas do Spring Boot", e)
    });
  }

  public create(newDish: Dish) {
    // Mapear Dish -> Prato (precisamos resolver a categoria. A API espera um objeto Categoria, ou podemos passar apenas o ID se o backend estiver preparado)
    // Para simplificar, enviaremos o objeto no formato esperado pelo Spring Boot
    const pratoPayload = {
      nome: newDish.title,
      descricao: newDish.description,
      preco: newDish.price,
      picture: newDish.picture,
      categoria: { id: this.categoryMap[newDish.category || ''] || 1 }
    };

    this.api.post<any>(this.apiUrl, pratoPayload).subscribe({
      next: (response) => {
        this.load();
      }
    });
  }

  public update(id: number, updatedDish: Dish) {
    const payload = {
      nome: updatedDish.title,
      descricao: updatedDish.description,
      preco: updatedDish.price,
      picture: updatedDish.picture,
      categoria: { id: this.categoryMap[updatedDish.category || ''] || 1 }
    };

    const url = updatedDish.type === 'bebida' 
      ? `http://localhost:8080/api/bebidas/${id}` 
      : `${this.apiUrl}/${id}`;

    this.api.put<any>(url, payload).subscribe({
      next: (response) => {
        this.load();
      }
    });
  }

  public removeById(id: number) {
    const dishToDelete = this._dishes()?.find(elem => elem.id === id);
    if (!dishToDelete) return;

    // Remove localmente primeiro para ser otimista
    const filteredDishes = this._dishes()?.filter(elem => elem.id !== id);
    this._dishes.set(filteredDishes ?? null);

    const url = dishToDelete.type === 'bebida' 
      ? `http://localhost:8080/api/bebidas/${id}` 
      : `${this.apiUrl}/${id}`;

    this.api.delete(url).subscribe({
      next: () => console.log('Deleted successfully'),
      error: () => this.load() // Se falhar, recarrega a lista real
    });
  }
}
