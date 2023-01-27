
import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";

const TOKEN_HEADER = 'Authorization';

// to refer
// https://ultimatecourses.com/blog/intro-to-angular-http-interceptors


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private login: LoginService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add the JWT token from local request
        let authReq = req;
        const token = this.login.getToken();
        if (token != null) {
            authReq = authReq.clone({ setHeaders: { Authorization: `Bearer ${token}` }, });
        }
        return next.handle(authReq);
    }

}


export const authInterceptorProviders = [

    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
    },

]