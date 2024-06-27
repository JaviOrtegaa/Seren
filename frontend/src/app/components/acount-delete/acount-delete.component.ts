import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acount-delete',
  templateUrl: './acount-delete.component.html',
  styleUrls: ['./acount-delete.component.css']  // Corregido de styleUrl a styleUrls
})
export class AcountDeleteComponent {
  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/login']);  // Ajusta la ruta según tu configuración
  }
}
