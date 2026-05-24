import { Component, inject } from '@angular/core';
import { ReservationStateService } from '../../services/reservation-state.service';

@Component({
  selector: 'app-footer-component',
  imports: [],
  templateUrl: './footer-component.html',
  styleUrl: './footer-component.css',
})
export class FooterComponent {
  private reservationState = inject(ReservationStateService);

  toggleForm() {
    this.reservationState.toggleForm();
  }
}
