import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { PdfService } from '../../pdf.service';

@Component({
  selector: 'app-readings',
  templateUrl: './readings.component.html',
  styleUrls: ['./readings.component.css']
})
export class ReadingsComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isMenuOpen = false;
  readings: { title: string, description: string, pdfId: string }[] = [
    { title: 'Invertir en salud mental OMS', description: 'Articulo', pdfId: '667bd52b8540795bdd703103' },
    { title: 'Guia salud mental y apoyo psicosocial', description: 'Guias', pdfId: '667bd52b8540795bdd7030fd' },
    { title: 'Guia de felicidad 80 consejos de salud mental', description: 'Guias', pdfId: '667bd52b8540795bdd7030fb' },
    { title: 'Desarrollo personal y bienestar', description: 'Apoyo emocional', pdfId: '667bd52b8540795bdd7030e0' },
    { title: 'Cuidado de la salud mental', description: 'Articulo', pdfId: '667bd52b8540795bdd703105' },
    { title: 'Saldremos de esta guia salud mental personas en crisis', description: 'Apoyo emocional', pdfId: '667bd52b8540795bdd7030ff' },
    { title: 'La salud mental del adolescente', description: 'Articulo', pdfId: '667bd52b8540795bdd703107' },
    { title: 'Guia salud mental un estado de bienestar', description: 'Guias', pdfId: '667bd52b8540795bdd703101' },
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
    } else if (option === 'Ejercicios') {
      this.router.navigate(['/exercises']);
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


