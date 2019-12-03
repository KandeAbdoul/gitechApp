import { AuthenticationService } from './../authentification.service';

import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor(public auth: AuthenticationService) {}
 
  canActivate(): boolean {
    return this.auth.isAuthenticated();
  }
}