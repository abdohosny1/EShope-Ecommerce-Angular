import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderComponent } from './order.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


const routes:Routes=[
  {path:"",component:OrderComponent},
  {path:":id",component:OrderDetailsComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class OrderRoutingModuleModule { }
