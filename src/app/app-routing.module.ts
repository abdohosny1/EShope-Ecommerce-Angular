import { ServerErrorComponent } from './core/server-error/server-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { ProductDeatilsComponent } from './shop/product-deatils/product-deatils.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [

  {path:"",component:HomeComponent,},

  {path: 'test-error', component: TestErrorComponent,},

  {path:"not-found",component:NotFoundComponent, },

  {path:"server-error",component:ServerErrorComponent ,},

  {path:"shop",loadChildren:()=>import('./shop/shop.module').then(mod=>mod.ShopModule),},

  {path:"basket",loadChildren:()=>import('./basket/basket.module').then(mod=>mod.BasketModule),},

  {path:"checkout", canActivate:[AuthGuard],loadChildren:()=>import('./checkout/checkout.module')
  .then(mod=>mod.CheckoutModule),},

  {path:"order", canActivate:[AuthGuard],loadChildren:()=>import('./order/order.module')
  .then(mod=>mod.OrderModule),},


  {path:"account",loadChildren:()=>import('./account/account.module').then(mod=>mod.AccountModule),},

  {path:"**",redirectTo:"not-found",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



// const routes: Routes = [

//   {path:"",component:HomeComponent,
//   data: {breadcrumb:  'Home'},},

//   {path: 'test-error', component: TestErrorComponent,
//     data: {breadcrumb: 'Test Error'},},

//   {path:"not-found",component:NotFoundComponent,
//   data: {breadcrumb: 'Not Found'}, },

//   {path:"server-error",component:ServerErrorComponent ,
//   data: { breadcrumb:'Server Error'},},

//   {path:"shop",loadChildren:()=>import('./shop/shop.module').then(mod=>mod.ShopModule)
//   ,data: { breadcrumb:  'Shope'},},

//   {path:"**",redirectTo:"not-found",pathMatch:"full"}
// ];
