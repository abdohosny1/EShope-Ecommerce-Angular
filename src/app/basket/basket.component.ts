import { IBasketItem } from './../shared/models/basketItem';
import { BasketService } from './basket.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket } from '../shared/models/basketItem';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  basket$ ?:Observable<IBasket>;

  constructor(private basketService :BasketService) { }

  ngOnInit(): void {
    this.basket$=this.basketService.basket$;
    console.log("basketttttt ="+ this.basket$.forEach(e=>{
      console.log(e);
    }));
  }

  removeBasketItem(item:IBasketItem){
   this.basketService.removeItemFromBasket(item);
  }

  incrementQuentity(item:IBasketItem){
    this.basketService.incremeantItem(item);
   }

   deincrementQuentity(item:IBasketItem){
    this.basketService.deincremeantItem(item);
   }

}
