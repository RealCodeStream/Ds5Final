import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private baseUrl = 'http://localhost:9000'; // Asegúrate de que la URL coincida con la configuración de tu backend

  constructor(private http: HttpClient) {}

  getAllRequests(): Observable<any> {
    return this.http.get(`${this.baseUrl}/requests/student`, this.getHeaders());
  }

  updateRequestStatus(requestId: string, status: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/requests/${requestId}/status`, { status }, this.getHeaders());
  }

  private getHeaders() {
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté guardado en localStorage
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }
}