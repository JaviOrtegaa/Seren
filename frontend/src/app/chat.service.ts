import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:3000/api/chat';

  constructor(private http: HttpClient) { }

  sendMessage(message: string): Observable<any> {
    const token = localStorage.getItem('token'); 

    if (!token) {
      throw new Error('Token no encontrado');
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.post<any>(this.apiUrl, { message }, { headers });
  }

  getMessages(): Observable<any> {
    const token = localStorage.getItem('token'); 

    if (!token) {
      throw new Error('Token no encontrado');
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<any>(`${this.apiUrl}/messages`, { headers });
  }
}

