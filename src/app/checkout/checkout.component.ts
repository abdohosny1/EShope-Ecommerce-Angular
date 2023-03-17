import { IBasketTotal } from './../shared/models/basketItem';
import { AccountService } from './../account/account.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from '../basket/basket.service';
import { IBasket } from '../shared/models/basketItem';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  checkOutForm!:FormGroup;
  basketTotal$!:Observable<IBasketTotal>;

  constructor(private fb:FormBuilder,private accountService:AccountService,private basketService:BasketService) { }



  ngOnInit(): void {
this.createCgeckoutForm();
this.getAddressFormValue();
this.getDeliveryMethodValue();
this.basketTotal$=this.basketService.basketTotal$;
  }

  createCgeckoutForm(){
    this.checkOutForm=this.fb.group({
      addressForm:this.fb.group({
        firstName:[null,Validators.required],
        lasttName:[null,Validators.required],
        streat:[null,Validators.required],
        city:[null,Validators.required],
        state:[null,Validators.required],
        zipCode:[null,Validators.required],
      }),
      deliverForm:this.fb.group({
        deliveryMethod:[null,Validators.required],
      }),
      paymentForm:this.fb.group({
        nameOnCard:[null,Validators.required],
      }),

    });
  }

  getAddressFormValue(){
    this.accountService.getUserAddress().subscribe(
      address=>{
        if(address){
          this.checkOutForm.get('addressForm')?.patchValue(address)
        }
      },
      error=>{
        console.log(error);
      }
    )
  }

  getDeliveryMethodValue(){
    const basket=this.basketService.getCurrentBasketValue();
          console.log("33333333333333333333333333333333");

console.log(basket);
    if(basket.deliveryMethodId !==null){
      //console.log("33333333333333333333333333333333");
      // console.log(basket.deliveryMethodId!.toString());
      // console.log( this.checkOutForm?.get("deliverForm")!.get("deliveryMethod")?.patchValue(basket.deliveryMethodId.toString()));
      this.checkOutForm.get("deliverForm")!.get("deliveryMethod")!.setValue(basket.deliveryMethodId.toString());
    }
  }
}

