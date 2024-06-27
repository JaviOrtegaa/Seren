import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { PdfService } from '../../pdf.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isMenuOpen = false;
  readings: { title: string, description: string, pdfId: string }[] = [
    { title: 'Carta de despedida', description: '(«la bulimia», «el agobio», «los nervios»…) ', pdfId: '667bd52b8540795bdd7030e8' },
    { title: 'Incordiando al Muñeco', description: '(«Factores externos»)', pdfId: '667bd52b8540795bdd7030ec' },
    { title: 'Carta desde el futuro', description: '(«Autosesion»)', pdfId: '667bd52b8540795bdd7030e2' },
    { title: 'El collage de los sueños', description: '(«Proyección emocional»)', pdfId: '667bd52b8540795bdd7030e4' },
    { title: 'Formula de primera sesión', description: '(«Percepción»)', pdfId: '667bd52b8540795bdd7030ea' },
    { title: 'La tarea de predicción', description: '(«Terapia centrada en las soluciones.»)', pdfId: '667bd52b8540795bdd7030f0' },
    { title: 'Cara o cruz', description: '(«Adaptada a pacientes que creen en la suerte»)', pdfId: '667bd52b8540795bdd7030e6' },
    { title: 'La pequeña felicidad', description: '(«Depresión»)', pdfId: '667bd52b8540795bdd7030ee' },
  ];

  constructor(private router: Router, private pdfService: PdfService) {}

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
  
    if (option === 'Chat') {
      this.router.navigate(['/chat']);
      this.isMenuOpen = true; // Mantener el menú abierto
    } else if (option === 'Lecturas') {
      this.router.navigate(['/readings']);
      this.isMenuOpen = true; // Mantener el menú abierto
    } else if (option === 'Eliminar cuenta') {
      this.router.navigate(['/delete']);
      this.isMenuOpen = true; // Mantener el menú abierto
    } else if (option === 'Cerrar sesión') {
      this.logout();
    }
  }

  logout() {
    console.log('Cerrando sesión');
    this.router.navigate(['/login']);
  }

  openPdf(pdfId: string): void {
    this.pdfService.getPdf(pdfId).subscribe(
      (pdfBlob: Blob) => {
        const fileURL = URL.createObjectURL(pdfBlob);
        window.open(fileURL, '_blank');
      },
      error => {
        console.error('Error al abrir el PDF:', error);
        // Manejar el error según sea necesario
      }
    );
  }
}

