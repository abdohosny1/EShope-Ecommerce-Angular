import { CheckoutComponent } from './checkout.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';


const routes:Routes=[
  {path:'',component:CheckoutComponent},
  {path:'Success',component:CheckoutSuccessComponent}


]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class CheckoutRoutingModule {

}
