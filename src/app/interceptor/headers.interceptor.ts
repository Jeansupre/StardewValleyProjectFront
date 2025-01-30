import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeadersInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const browserLanguage = navigator.language || 'es';
    const languageHeader = browserLanguage.split('-')[0]; // Extrae 'es' de 'es-ES'

    if (!request.url.includes('/public')) {
      // Clona la solicitud y agrega las cabeceras necesarias
      const modifiedRequestWithAuthroization = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Accept-Language': languageHeader,
        },
      });
      return next.handle(modifiedRequestWithAuthroization);
    } else {
      const modifiedRequest = request.clone({
        setHeaders: {
          'Accept-Language': languageHeader,
        },
      });

      // Envía la solicitud modificada
      return next.handle(modifiedRequest);
    }
  }
}
