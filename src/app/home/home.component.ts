import { ShopService } from './../shop/shop.service';
import { Component, OnInit } from '@angular/core';

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Router } from '@angular/router';
import { IProduct } from '../shared/models/Iproduct';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  breakpoints = {
    320: { slidesPerview: 1.6, spaceBetween: 20 },
    640: { slidesPerview: 2.6, spaceBetween: 20 },
    768: { slidesPerView: 4.6, spaceBetween: 40 },
    1024: { slidesPerview: 6.6, spaceBetween: 40 },
  }
  product?:Array<IProduct>=[];
//   productTest:any;
//   brand:Array<IBrand>=[];
//   type:Array<IProductType>=[];
// showPrams!: ShowPrams;
totalCount:any;
  constructor(private shopeService:ShopService,private router:Router,) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(){
    this.shopeService.getProduct().subscribe(
      (response)=>{
        this.product=response?.data;
         console.log("ccccccccccc")
        console.log( this.product);

      },
      (error)=>{
           console.log(error);
      }
    )
  }

}
