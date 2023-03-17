import { BasketService } from './../../../basket/basket.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IBasketTotal } from '../../models/basketItem';

@Component({
  selector: 'app-order-total',
  templateUrl: './order-total.component.html',
  styleUrls: ['./order-total.component.scss']
})
export class OrderTotalComponent implements OnInit {

   basketTotal$!:Observable<IBasketTotal>;

  constructor(private basketService:BasketService) { }

  ngOnInit(): void {
    this.basketTotal$=this.basketService.basketTotal$
    console.log('basketmmmm ='+this.basketTotal$.forEach(e=>{
      console.log(e);
    }))
  }

}
