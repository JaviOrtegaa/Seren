import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private apiUrl = 'http://localhost:3000/api'; // Ajusta la URL según corresponda

  constructor(private http: HttpClient) {}

  getPdf(pdfId: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/pdf/${pdfId}`, { responseType: 'blob' });
  }
}

