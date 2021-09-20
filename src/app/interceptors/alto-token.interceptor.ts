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
/*
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request);
  }
}
*/
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    var _token = localStorage.getItem('tokenUser');
    const dupReq = req.clone({
      headers: req.headers.set(('authorization' || 'Authorization' ), _token ? 'Token ' + _token : '' )
    });
    return next.handle(dupReq);
  }
}
