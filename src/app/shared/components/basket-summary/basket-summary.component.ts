import { IBasketItem } from './../../models/basketItem';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from '../../models/basketItem';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit {

  basket$ ?:Observable<IBasket>;
  @Output() decrement:EventEmitter<IBasketItem>=new EventEmitter<IBasketItem>();
  @Output() incremant:EventEmitter<IBasketItem>=new EventEmitter<IBasketItem>();
  @Output() remove:EventEmitter<IBasketItem>=new EventEmitter<IBasketItem>();
  @Input() isbasket=true;


  constructor(private basketService :BasketService) { }

  ngOnInit(): void {
    this.basket$=this.basketService.basket$;
  }

  deincrementQuentity(item:IBasketItem){
    this.decrement.emit(item);
  }

  incrementQuentity(item:IBasketItem){
    this.incremant.emit(item);
  }

  removeBasketItem(item:IBasketItem){
    this.remove.emit(item);
  }

}


