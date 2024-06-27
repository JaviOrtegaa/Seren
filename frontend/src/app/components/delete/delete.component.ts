import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isMenuOpen = false;
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      this.sidenav.open();
    } else {
      this.sidenav.close();
    }
  }

  selectOption(option: string) {
    console.log('Opción seleccionada:', option);

    switch (option) {
      case 'Chat':
        this.router.navigate(['/chat']);
        break;
      case 'Ejercicios':
        this.router.navigate(['/exercises']);
        break;
      case 'Lecturas':
        this.router.navigate(['/readings']);
        break;
      case 'Eliminar cuenta':
        this.router.navigate(['/delete']);
        break;
      case 'Cerrar sesión':
        this.logout();
        break;
      default:
        break;
    }
    this.isMenuOpen = false;
  }

  logout() {
    console.log('Cerrando sesión');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  deleteAccount() {
    this.authService.deleteAccount().subscribe(
      () => {
        console.log('Cuenta eliminada correctamente');
        this.router.navigate(['/login']); 
      },
      error => {
        console.error('Error al eliminar cuenta:', error);
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    );
  }
}

