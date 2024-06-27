import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = ''; // Variable para almacenar el mensaje de error

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        console.log('Usuario autenticado', response);
        localStorage.setItem('token', response.token); // Almacenar el token en localStorage
        this.router.navigate(['/chat']); // Navegar al componente de chat si la autenticación es exitosa
      },
      error => {
        console.error('Error al autenticar usuario', error);
        this.errorMessage = 'Usuario o contraseña incorrectos'; // Establecer el mensaje de error
      }
    );
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  navigateToRecoveryPassword() {
    this.router.navigate(['/recovery-password']);
  }
}




