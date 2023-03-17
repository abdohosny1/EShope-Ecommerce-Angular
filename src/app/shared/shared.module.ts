import { RouterModule } from '@angular/router';
import { StepperComponent } from './components/stepper/stepper.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CarouselModule } from 'ngx-bootstrap/carousel';


import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';
import { OrderTotalComponent } from './components/order-total/order-total.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TextInputComponent } from './components/text-input/text-input.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { BasketSummaryComponent } from './components/basket-summary/basket-summary.component';
import { SwiperModule } from 'swiper/angular';






@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagerComponent,
    OrderTotalComponent,
    TextInputComponent,
    StepperComponent,
    BasketSummaryComponent

  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    CdkStepperModule,
    RouterModule,
    SwiperModule,



  ],
  exports:[
    PaginationModule,
    PagingHeaderComponent,
    PagerComponent,
    CarouselModule,
    OrderTotalComponent,
    BsDropdownModule,
    ReactiveFormsModule,
    TextInputComponent,
    CdkStepperModule,
    StepperComponent,
    BasketSummaryComponent,
    SwiperModule,



  ]
})
export class SharedModule { }
