import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  register(username: string, password: string, email: string): Observable<any> {
    const user = { username, password, email };
    return this.http.post<any>(`${this.baseUrl}/register`, user).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token); 
        }
      })
    );
  }

  login(username: string, password: string): Observable<any> {
    const user = { username, password };
    return this.http.post<any>(`${this.baseUrl}/login`, user).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token); // Almacenar el token en localStorage
        }
      })
    );
  }

  deleteAccount(): Observable<any> {
    const token = localStorage.getItem('token'); // Obtener el token del localStorage

    if (!token) {
      throw new Error('Token no encontrado');
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.delete<any>(`${this.baseUrl}/delete-account`, { headers });
  }

  chatWithGPT(message: string): Observable<any> {
    const token = localStorage.getItem('token'); // Obtener el token del localStorage

    if (!token) {
      throw new Error('Token no encontrado');
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    const chatMessage = { message };
    return this.http.post<any>(`${this.baseUrl}/api/chat`, chatMessage, { headers });
  }

  logout(): void {
    localStorage.removeItem('token'); // Eliminar el token del localStorage al cerrar sesión
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Verificar si hay un token en localStorage
  }

  

}



