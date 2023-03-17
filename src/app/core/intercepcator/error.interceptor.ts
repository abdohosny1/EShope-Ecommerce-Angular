import { NavigationExtras, Router, Routes } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr'
import { Observable, catchError, throwError, delay } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router:Router,private toat:ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      // delay(1000),
      catchError(error=>{
        if(error){
          if(error.status===400){
             if(error.error.errors){
                   throw error.error;
             }else{
              this.toat.error(error.error.message,error.error.statusCode)
             }
                 this.toat.error(error.error.message,error.error.statusCode)
               }
               if(error.status===401){
                this.toat.error(error.error.message,error.error.statusCode)
              }
           if(error.status===404){
             this.router.navigateByUrl("/not-found");
           }
           if(error.status===500){
            const navigationExtras:NavigationExtras={state: {error:error.error } };
            this.router.navigateByUrl("/server-error",navigationExtras);
          }
        }
        return throwError(error);
      })
    );
  }
}
