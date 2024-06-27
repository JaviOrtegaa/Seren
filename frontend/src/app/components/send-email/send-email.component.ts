import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent {

  constructor(private router: Router) {} // Inyecta Router en el constructor

  navigateToLogin() {
    this.router.navigate(['/login']); // Navega al componente LoginComponent
  }
}