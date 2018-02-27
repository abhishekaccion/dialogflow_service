import { Router } from "@angular/router";
import {
  HttpInterceptor,
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import "rxjs/add/operator/do";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  token: string;
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.token = localStorage.getItem("code");

    req = req.clone({
      setHeaders: {
        "x-authpa-token": `a520cd5827f64997b7710da2ae2dfa80`,
        "Content-Type": "application/json"
      }
    });
    return next.handle(req);
    // .do(event => {
    // 	if (event instanceof HttpResponse) {
    // 		// If session out it will redirect it to login
    // 		if (event.body.responseCode === 9) {
    // 			this.router.navigate(["/login"]);
    // 			localStorage.clear();
    // 		}
    // 	}
    // });
  }
}
