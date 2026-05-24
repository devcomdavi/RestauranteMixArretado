import { Component, inject } from '@angular/core';
import { signal } from '@angular/core';
import { ReservationStateService } from '../../services/reservation-state.service';

@Component({
  selector: 'app-reservation-form-component',
  imports: [],
  templateUrl: './reservation-form-component.html',
  styleUrl: './reservation-form-component.css',
})
export class ReservationFormComponent {
  private reservationState = inject(ReservationStateService);
  
  // Opcional: Referencia o signal do serviço para usar no HTML se desejar
  public openForm = this.reservationState.openForm;

  toggleForm() {
    this.reservationState.toggleForm();
  }

}
