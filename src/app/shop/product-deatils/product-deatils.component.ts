import { BasketService } from './../../basket/basket.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBasketItem } from 'src/app/shared/models/basketItem';
import { IProduct } from 'src/app/shared/models/Iproduct';
//import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';


@Component({
  selector: 'app-product-deatils',
  templateUrl: './product-deatils.component.html',
  styleUrls: ['./product-deatils.component.scss']
})
export class ProductDeatilsComponent implements OnInit {

  productItem!:IProduct;
  quentity=1;



  constructor(private service:ShopService,private activedRoute:ActivatedRoute,private basketService:BasketService
   // private bsService:BreadcrumbService
    ) {
      //bsService.set("@ProductDeatails","");
    }

  ngOnInit(): void {
    this.getproductById();
  }

  getproductById(){
    this.service.getProductById(+this.activedRoute.snapshot.paramMap.get('id')!).subscribe(
      (response)=>{
        this.productItem=response;
       // const breadcrumb =  {customText: '@ProductDeatails', dynamicText:response.name };
       // this.bsService.set('@ProductDeatails',response.name);
      },
      (error)=>{
        console.log(error);
      }
    )

  }

  addItemToCart(){
    this.basketService.addItemToBasket(this.productItem,this.quentity);

  }


  incrementQuentity(){
    this.quentity++;
   }

   deincrementQuentity(){
     if(this.quentity >1){
      this.quentity--;
     }
   }

}
