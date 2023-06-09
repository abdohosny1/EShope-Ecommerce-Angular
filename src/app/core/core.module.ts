import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TestErrorComponent } from './test-error/test-error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import {ToastrModule} from 'ngx-toastr';
import { SectionHeaderComponent } from './section-header/section-header.component'
//import {BreadcrumbModule} from 'xng-breadcrumb';
//import {BreadcrumbModule} from 'xng-breadcrumb';
//import {NgDynamicBreadcrumbModule} from "ng-dynamic-breadcrumb";
//import { BreadcrumbModule } from 'xng-breadcrumb';




@NgModule({
  declarations: [
    NavBarComponent,
    TestErrorComponent,
    NotFoundComponent,
    ServerErrorComponent,
    SectionHeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
   // BreadcrumbModule,
    //NgDynamicBreadcrumbModule,
    ToastrModule.forRoot({
      positionClass:'toast-bottom-right',
      preventDuplicates:true,
    }),
  ],
  exports:[
    NavBarComponent,
    TestErrorComponent,
    SectionHeaderComponent
  ]
})
export class CoreModule { }
