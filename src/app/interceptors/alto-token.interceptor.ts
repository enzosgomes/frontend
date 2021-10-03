import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AltoTokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    var _token = localStorage.getItem('tokenUser');
    const dupReq = req.clone({
      headers: req.headers.set(('Authorization'), _token ? 'Token ' + _token : '' )
    });
    return next.handle(dupReq);
  }
}
