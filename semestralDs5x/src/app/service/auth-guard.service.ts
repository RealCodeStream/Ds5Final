import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      console.log('Autenticado');
      return true;
    } else {
      this.router.navigate(['/login']);
      console.log('No Fue Psible ir a Nav');
      return false;
    }
  }
}