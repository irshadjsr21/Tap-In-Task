import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AuthService } from './../services/auth.service';

@Injectable({
  providedIn: 'root'
})

// **************** Guard for Protected Routes *****************
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // If User does not have a valid token => redirect to /login with error msg & prevent access
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl(
        '/login?error=Please login again, token is missing or not valid'
      );
      this.authService.deleteToken();
      return false;
    }

    // If User have a valid token allow access
    return true;
  }
}
