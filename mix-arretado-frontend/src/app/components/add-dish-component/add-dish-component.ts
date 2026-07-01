import { Component, inject, effect } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddFormStateService } from '../../services/add-form-state.service';
import { DishService } from '../../services/dish-service';
import { Dish } from '../../models/dish.model';

@Component({
  selector: 'app-add-dish-component',
  imports: [ReactiveFormsModule],
  templateUrl: './add-dish-component.html',
  styleUrl: './add-dish-component.css',
})
export class AddDishComponent {
  public addFormState = inject(AddFormStateService);
  private dishService = inject(DishService);
  private fb = inject(FormBuilder);
  
  public dishForm: FormGroup;
  public openAddForm = this.addFormState.openAddForm;

  constructor() {
    this.dishForm = this.fb.group({
      dishName: ['', [Validators.required]],
      dishDescription: ['', [Validators.required]],
      dishPrice: ['', [Validators.required, Validators.pattern(/^[0-9]+([,\.][0-9]+)?$/)]],
      selectedCategory: ['tapioca-arretada', [Validators.required]],
      dishPicture: ['']
    });

    effect(() => {
      const editingDish = this.addFormState.editingDish();
      if (editingDish) {
        this.dishForm.patchValue({
          dishName: editingDish.title,
          dishDescription: editingDish.description,
          dishPrice: editingDish.price,
          selectedCategory: editingDish.category,
          dishPicture: editingDish.picture !== '/imagens/template_prato.png' && editingDish.picture !== 'images/template_prato.png' ? editingDish.picture : ''
        });
      } else {
        this.dishForm.reset({ selectedCategory: 'tapioca-arretada' });
      }
    });
  }

  toggleAddForm() {
    this.addFormState.toggleAddForm();
  }

  triggerAddButton() {    
    if (this.dishForm.valid) {
      const formValue = this.dishForm.value;
      const precoString = String(formValue.dishPrice).replace(',', '.');
      const precoFormatado = parseFloat(precoString);

      const editingDish = this.addFormState.editingDish();

      const postDish: Dish = {
        title: formValue.dishName,
        description: formValue.dishDescription,
        picture: formValue.dishPicture ? formValue.dishPicture : (editingDish?.picture || 'images/template_prato.png'),
        price: precoFormatado,
        category: formValue.selectedCategory
      };
      
      if (editingDish && editingDish.id !== undefined) {
        this.dishService.update(editingDish.id, postDish);
      } else {
        this.dishService.create(postDish);
      }
      
      this.dishForm.reset({ selectedCategory: 'tapioca-arretada' });
      this.toggleAddForm();
    } else {
      alert("Por favor, preencha todos os campos obrigatórios corretamente (Nome, Preço válido e selecione uma Categoria)!");
      this.dishForm.markAllAsTouched();
    }
  }

}