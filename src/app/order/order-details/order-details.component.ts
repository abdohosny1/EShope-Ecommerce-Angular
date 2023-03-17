import { OrderService } from './../order.service';
import { IOrder } from './../../shared/models/Iorder';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  order!:IOrder;
  constructor(
    private activeRoute:ActivatedRoute,
    private orderServices:OrderService,
  ) { }

  ngOnInit(): void {
    this.orderServices.getOrderDetails(+this.activeRoute.snapshot.paramMap.get('id')!).subscribe(
      (order:any)=>{
        this.order=order;
      },error=>{
        console.log(error);
      }
    )
  }

}
