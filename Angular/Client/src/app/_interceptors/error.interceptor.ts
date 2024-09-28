
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Injectable, inject} from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/*===
@Injectable()
export class errorInterceptor implements HttpInterceptor {
  router = inject(Router);
  toastr = inject(ToastrService);
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error){
          switch (error.status) {
            case 400:
              if(error.error.errors)
              {
                const modalStateErrors = [];
                for(const key in error.error.errors)
                {
                  if(error.error.errors[key])
                  {
                    modalStateErrors.push(error.error.errors[key]);
                  }
                }
                throw modalStateErrors.flat();
              }
              else
              {
                this.toastr.error(error.error, error.error.status);
              }
              break;
              case 401:
                this.toastr.error('Unauthorized', error.error.status);
                break;
              case 404:
                this.router.navigateByUrl('/not-found');
                break;
              case 500:
                const navigationExtras: NavigationExtras = {state:{error: error.error}};
                this. router.navigateByUrl('/server-error', navigationExtras);
                break;
            default:
              this.toastr.error('Something unexpected went wrong.')
              break;
          }
        }
        throw error;
      })
    );
  }
}

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { error } from 'console';
import { Router } from 'express';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';
===*/
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError(error => {
      if(error){
        switch (error.status) {
          case 400:
            if(error.error.errors)
            {
              const modalStateErrors = [];
              for(const key in error.error.errors)
              {
                if(error.error.errors[key])
                {
                  modalStateErrors.push(error.error.errors[key]);
                }
              }
              throw modalStateErrors.flat();
            }
            else
            {
              toastr.error(error.error, error.status);
            }
            break;
            case 401:
              toastr.error('Unauthorized', error.status);
              break;
            case 404:
              router.navigateByUrl('/not-found');
              break;
            case 500:
              const navigationExtras: NavigationExtras = {state:{error: error.error}};
              router.navigateByUrl('/server-error', navigationExtras);
              break;
          default:
            toastr.error('Something unexpected went wrong.')
            break;
        }
      }
      throw error;
    })
  )
};
