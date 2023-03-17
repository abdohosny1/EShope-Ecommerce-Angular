import { SharedModule } from './../shared/shared.module';
import { OrderRoutingModuleModule } from './order-routing-module.module';
import { OrderComponent } from './order.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailsComponent } from './order-details/order-details.component';



@NgModule({
  declarations: [
    OrderDetailsComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModuleModule,
    SharedModule
  ]
})
export class OrderModule { }
