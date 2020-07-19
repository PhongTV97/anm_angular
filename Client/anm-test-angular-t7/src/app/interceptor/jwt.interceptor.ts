import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, empty } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const curUser = JSON.parse(localStorage.getItem('cur_user'));
        if (curUser) {
            request = request.clone({
                setHeaders: {
                    token: curUser.token
                }
            });
            return next.handle(request);
        } else if (request.url.indexOf('login') !== -1) {
            return next.handle(request);
        } else {
            this.router.navigateByUrl('/error');
            return Observable.create(empty);
        }
    }
}
