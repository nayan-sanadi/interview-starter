import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    // Quote: All http requests from the app should be logged to console. 
    const logMessage = `${request.method} request sent to ${request.url}`;
    if (request.body) {
      console.log(logMessage, ' with body ', request.body);
    } else {
      console.log(logMessage);
    }

    // Should we log the response also?
    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          console.log('Received HTTP response: ', event.status, event.body);
        }
      })
    );
  }
}
