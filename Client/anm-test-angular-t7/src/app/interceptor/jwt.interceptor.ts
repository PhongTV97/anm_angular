import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, empty } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentToken = localStorage.getItem('token');
        if (currentToken !== null || request.url.indexOf('login') !== -1) {
            request = request.clone({
                setHeaders: {
                    token: currentToken,
                }
            });
            return next.handle(request);
        }
        else {
            this.router.navigateByUrl('Error');
            return Observable.create(empty);
        }
    }
}
