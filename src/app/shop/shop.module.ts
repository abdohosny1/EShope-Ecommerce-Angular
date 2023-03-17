import { ShopRoutingModule } from './shop-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductDeatilsComponent } from './product-deatils/product-deatils.component';



@NgModule({
  declarations: [
    ShopComponent,
    ProductItemComponent,
    ProductDeatilsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShopRoutingModule
  ],

})
export class ShopModule { }
