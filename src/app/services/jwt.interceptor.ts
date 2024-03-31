import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { environmentAPI } from '../environments/bloosat.environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private localStorage: LocalStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.localStorage.getToken();
    const isAPIURL = request.url.startsWith(environmentAPI.environment.BLOOSAT_BSS_URL_CONNECTION);

    if(token && isAPIURL){
      request = request.clone({
        setHeaders:{
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
    }
    return next.handle(request);
  }
}
