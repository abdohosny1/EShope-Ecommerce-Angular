import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';
import { IPaganation } from './shared/models/pagantion';

import { HttpClient } from '@angular/common/http';
import { IProduct } from 'src/app/shared/models/Iproduct';
import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/products/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  listProduct:Array<IProduct>=[];
  errorMassage: any;
  //public listProduct:any=[];



   constructor(private basketService :BasketService,private accountService :AccountService){}


  ngOnInit(): void {
this.loodBasket();
this.loadCurentUser();

  }

  loadCurentUser(){

    const token =localStorage?.getItem("token") || ''  ;
      this.accountService?.loadCurrentUser(token)?.subscribe(
        ()=>{
          console.log("Loaded User");
        },
        (error)=>{
          console.log(error);

        }
      );

  }

  loodBasket(){
    const basketId=localStorage.getItem("basket_id");
    if(basketId){
      this.basketService.getBasket(basketId).subscribe(()=>{
        console.log("inilitze Basket");
      },error=>{
        console.log(error);

      })
    }
  }
  title = 'Ecommerce';
}
