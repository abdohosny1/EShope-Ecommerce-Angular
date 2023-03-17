import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ShopComponent } from './shop.component';
import { ProductDeatilsComponent } from './product-deatils/product-deatils.component';

const routes: Routes = [
  {path:"",component:ShopComponent},
  {path:":id",component:ProductDeatilsComponent,data: {breadcrumb:{alias:"ProductDeatails"}}},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class ShopRoutingModule { }
