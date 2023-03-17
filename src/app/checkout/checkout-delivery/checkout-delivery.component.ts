import { BasketService } from 'src/app/basket/basket.service';
import { IDeliveryMethod } from './../../shared/models/deliveryMethod';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CheckoutRoutingService } from '../checkout-routing.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss']
})
export class CheckoutDeliveryComponent implements OnInit {
  @Input() checkOutForm!:FormGroup;
  deliveryMetho!:IDeliveryMethod[];

  constructor(private service:CheckoutRoutingService,private basketService:BasketService) { }

  ngOnInit(): void {
    this.service.GetDeliveryMethod().subscribe(
      (dm:any)=>{
           this.deliveryMetho=dm;
      },
      error=>{
        console.log(error);
      }
    )
  }

  setShippingPrice(deliveryMethod:IDeliveryMethod){
       this.basketService.setShipping(deliveryMethod);
      //  console.log("11111111111111111111111111111111");
      //  console.log(deliveryMethod)
  }

}
