import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private  http:HttpClient) { }

  getOrderForUser(){
    return this.http.get(environment.BASE_URL+environment.ORDER)
  }

  getOrderDetails(id:number){
    return this.http.get(environment.BASE_URL+environment.ORDER+"/"+id)
  }
}
