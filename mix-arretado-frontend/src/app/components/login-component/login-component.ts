import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {
    // If already logged in, redirect to menu
    if (this.authService.session) {
      this.router.navigate(['/cardapio']);
    }
  }

  async onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';
    
    try {
      const { data, error } = await this.authService.signIn(this.email, this.password);
      if (error) {
        this.errorMessage = error.message;
      } else if (data.session) {
        this.router.navigate(['/cardapio']);
      }
    } catch (e) {
      this.errorMessage = 'Erro ao fazer login. Tente novamente.';
    } finally {
      this.isLoading = false;
    }
  }
}
