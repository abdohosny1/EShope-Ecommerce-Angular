import { SharedModule } from './shared/shared.module';
import { ErrorInterceptor } from './core/intercepcator/error.interceptor';
import { HomeModule } from './home/home.module';
import { ShopModule } from './shop/shop.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './core/intercepcator/loadding.interceptor.ts';
import { JWTInterceptor } from './core/intercepcator/jwt.interceptor';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    HomeModule,
    NgxSpinnerModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:JWTInterceptor,multi:true},


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
