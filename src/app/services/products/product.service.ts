import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IProduct } from 'src/app/shared/models/Iproduct';
import { IPaganation } from 'src/app/shared/models/pagantion';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private  http:HttpClient) { }

  
  retutnHome(): Observable<IPaganation[]> {

    return this.http.get<IPaganation[]>(environment.BASE_URL + environment.PRODUCT)
      .pipe(catchError((error) => {
        return throwError(() => error.message || "");
      }))
    }

    returnPaganation(){
      return this.http.get<IPaganation[]>(environment.BASE_URL + environment.PRODUCT);
    }
}
