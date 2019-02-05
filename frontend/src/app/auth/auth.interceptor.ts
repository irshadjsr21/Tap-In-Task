import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()

// **************** Interceptor to add JWT ********************
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // If NoAuth header is present => proceed with the existing req
    if (req.headers.get('noAuth')) {
      return next.handle(req.clone());
    } else {
      // Else add JWT to the req
      const cloneReq = req.clone({
        headers: req.headers.set(
          'Authorization',
          'Bearer ' + this.authService.getToken()
        )
      });

      // Check response For errors
      return next.handle(cloneReq).pipe(
        tap(
          result => {},
          error => {
            // If error status is 401 => redirect to /login with error msg
            if (error['status'] === 401) {
              this.router.navigateByUrl(
                '/login?error=Please login again, token is missing or not valid'
              );
              this.authService.deleteToken();
            }
          }
        )
      );
    }
  }
}
