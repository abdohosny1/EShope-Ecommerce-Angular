import { ISendingEmailTemp } from './../shared/models/sendEmail';
import { IOrderToCreate } from './../shared/models/Iorder';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IDeliveryMethod } from '../shared/models/deliveryMethod';
 import { map } from 'rxjs/operators';
import { ISendingEmail } from '../shared/models/sendEmail';


@Injectable({
  providedIn: 'root'
})
export class CheckoutRoutingService {

  constructor(private  http:HttpClient) { }

 createOrder(order:IOrderToCreate){
  return this.http.post(environment.BASE_URL+environment.ORDER,order);
 }

  GetDeliveryMethod(){
   return   this.http.get(environment.BASE_URL+environment.ORDER+environment.DELIVERYMETHOD).pipe(
      // map((dm:IDeliveryMethod[])=>{
      //   return dm.sort((a,b)=>b.price-a.price);
      // })
      map((dm:any)=>{
        return dm.sort((a:any,b:any)=>b.price-a.price);
      })
    );
  }

  sendingEmaill(sendEmail:ISendingEmail){
    return this.http.post(environment.BASE_URL+environment.SENDINGEMAILL,sendEmail);

  }

  sendingEmaillTemp(sendEmailTemp:ISendingEmailTemp){
    return this.http.post(environment.BASE_URL+environment.SENDINGEMAILLtEMP,sendEmailTemp);

  }
}
