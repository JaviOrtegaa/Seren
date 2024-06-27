import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  email: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  register() {
    if (this.username && this.password && this.email) {
      this.authService.register(this.username, this.password, this.email).subscribe(
        response => {
          console.log('Registro exitoso:', response);
          localStorage.setItem('token', response.token);
          this.router.navigate(['/register-successful']); // Redireccionar a la página principal después del registro exitoso
        },
        error => {
          console.error('Error en el registro:', error);
          this.errorMessage = 'Error al registrar usuario, intente nuevamente';
        }
      );
    } else {
      this.errorMessage = 'Por favor, complete todos los campos';
    }
  }
}

 