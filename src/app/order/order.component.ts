import { IOrder } from './../shared/models/Iorder';
import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orders!:IOrder[];
  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
    this.getOrer();
  }

  getOrer(){
    this.orderService.getOrderForUser().subscribe(
      (orderss:any)=>{
        this.orders=orderss;
      },
      error=>{
        console.log(error);
      }
    )
  }

}
