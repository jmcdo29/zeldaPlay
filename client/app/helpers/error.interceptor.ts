import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS} from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { catchError} from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // extract error message from http body if an error occurs
    return next.handle(request)
      .pipe(
        catchError(errorResponse => {
          return Observable.throw(errorResponse);
        })
    );
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
