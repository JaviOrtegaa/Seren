import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css']
})
export class RecoveryPasswordComponent {
  constructor(private router: Router) {}

  navigateToSendEmail() {
    this.router.navigate(['/send-email']); // Cambia la ruta al componente deseado
  }
}
