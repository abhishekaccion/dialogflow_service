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
import { config } from "./config/config";

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  token: string;
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.token = localStorage.getItem("code");
    console.log(config);
    req = req.clone({
      setHeaders: {
        "x-authpa-token": config["x-authpa-token"],
        "Content-Type": "application/json"
      }
    });
    return next.handle(req);
  }
}
