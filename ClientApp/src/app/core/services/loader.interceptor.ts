import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.requestStarted();
    return next.handle(request).pipe(
      tap(
        (event) => {
          if(event instanceof HttpResponse) {
            this.loaderService.requestEnded();
          }
        },(error: HttpErrorResponse) => {
          this.loaderService.resetSpinner();
          throw error;
        }
      )
    );
  }
}
