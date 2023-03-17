import { Router, NavigationExtras } from '@angular/router';
import { IOrder } from './../../shared/models/Iorder';
import { IBasket } from './../../shared/models/basketItem';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/basket.service';
import { AfterViewInit, Component, Input, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CheckoutRoutingService } from '../checkout-routing.service';

declare var Stripe:any;

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements AfterViewInit ,OnDestroy{

  @Input() checkOutForm!:FormGroup;
  @ViewChild('cardNumber',{static:true}) cardNumberElement!:ElementRef;
   @ViewChild('cardExpiry',{static:true}) cardExpiryElement!:ElementRef;
  @ViewChild('cardCvc',{static:true}) cardCvcElement!:ElementRef;

  stripe:any;
  cardNumber:any;
  cardExpiry:any;
  cardCvc:any;
  cardErrors:any;
  cardHandler = this.onChange.bind(this);
  loading=false;
  cardNumberValid=false;
  cardExpiryValid=false;
  cardCvcValid=false;




  constructor(
    private basketService:BasketService,
    private checkoutService:CheckoutRoutingService,
    private tosater:ToastrService,
    private router:Router) { }


  ngOnDestroy(): void {
    this.cardNumber.destroy();
    this.cardExpiry.destroy();
    this.cardCvc.destroy();

  }

  ngAfterViewInit(): void {
    this.stripe=Stripe('pk_test_51MIz7IDxTKu5KracFGQNUwr5A6au28beWZPhoUhZMeS3sezsjinL3lcIFwK2JzVbh7p7fj0oXSaeBKYrTo1aVJs90070wFnsr8');
    const elements=this.stripe.elements();

    this.cardNumber=elements.create('cardNumber');
    this.cardNumber.mount(this.cardNumberElement.nativeElement);
    this.cardNumber.addEventListener('change',this.cardHandler);

    this.cardExpiry=elements.create('cardExpiry');
     this.cardExpiry.mount(this.cardExpiryElement.nativeElement);
     this.cardExpiry.addEventListener('change',this.cardHandler);


    this.cardCvc=elements.create('cardCvc');
    this.cardCvc.mount(this.cardCvcElement.nativeElement);
    this.cardCvc.addEventListener('change',this.cardHandler);



  }

  createSendingEmail(){
    const sendEmaillToCreate =this.getEmailToCreate();

   return this.checkoutService.sendingEmaill(sendEmaillToCreate).subscribe(
    (res:any)=>{
    },error=>{

  console.log(error);
    }
    )
  }

  createSendingEmailTemp(order:any){
    const sendEmaillToCreate =this.getEmailToCreateTemp(order);

   return this.checkoutService.sendingEmaillTemp(sendEmaillToCreate).subscribe(
    (res:any)=>{
    },error=>{

  console.log(error);
    }
    )
  }

  onChange(event:any){
    // console.log(event);
    if(event.error){
      this.cardErrors=event.error.message;
    }else{
      this.cardErrors=null;
    }

    switch(event.elementType)
    {
      case'cardNumber' :
        this.cardNumberValid=event.complete
        break;
        case'cardExpiry' :
        this.cardExpiryValid=event.complete
        break;
        case'cardCvc' :
        this.cardCvcValid=event.complete
        break;


    }
  }

  async sumbitOrder1(){
    const basket=this.basketService.getCurrentBasketValue();
    const orderToCreate =this.getOrderToCraeet(basket);
    this.checkoutService.createOrder(orderToCreate).subscribe((order:any)=>{
      this.tosater.success("order creared");
      this.stripe.confirmCardPayment( basket.clientSecret,{
        payment_method:{
          card:this.cardNumber,
          billing_details:{
            name:this.checkOutForm.get('paymentForm')?.get('nameOnCard')?.value
          }
        }
      }).then((result:any)=>{
        if(result.paymentIntent){
          //  this.basketService.deleteLocalBasket(basket.id);
          this.basketService.deleteBasket(basket);
          const navigateExtras :NavigationExtras={state:order};
          this.router.navigate(['checkout/Success'],navigateExtras);
        }else{
          this.tosater.error(result.erroe.message);

        }
      })
    })

  }



  async sumbitOrder(){
    this.loading=true;
    const basket=this.basketService.getCurrentBasketValue();
    try{
      const createOrder=await this.createOrder(basket);
      const paymentResult=await this.confirmePaymentWithStripe(basket);
      console.log(createOrder)

      if(paymentResult.paymentIntent){
   this.basketService.deleteLocalBasket(basket.id);
    const navigateExtras :NavigationExtras={state:createOrder};
   // this.createSendingEmail();
    this.router.navigate(['checkout/Success'],navigateExtras);
    this.createSendingEmailTemp(createOrder as IOrder);
      }else{
        this.tosater.error(paymentResult.error.message);
      }
      this.loading=false;
    }catch( error){
       console.log(error);
       this.loading=false;

    }
   // console.log(orderToCreate);

  }
  private async confirmePaymentWithStripe(basket :any) {
  return  this.stripe.confirmCardPayment( basket.clientSecret,{
      payment_method:{
        card:this.cardNumber,
        billing_details:{
          name:this.checkOutForm.get('paymentForm')?.get('nameOnCard')?.value
        }
      }
    })
  }
  private async createOrder(basket: any) {
    const orderToCreate =this.getOrderToCraeet(basket);
 return    this.checkoutService.createOrder(orderToCreate).toPromise();
  }
  private getOrderToCraeet(basket: IBasket) {
    return {
      baskeyId:basket.id,
      deliveryMethodId: +this.checkOutForm.get('deliverForm')?.get('deliveryMethod')?.value.substring(1,2),
      shippingAddress:this.checkOutForm.get('addressForm')?.value,
    }
  }

  private getEmailToCreate(){
    return {
      "tOEmail": "abdelaliemhosny18@gmail.com",
      "Subject": "make Order",
      "Body": "Order Done"
    }
  }

  private getEmailToCreateTemp(order:any){
    return {
      "Email": "abdelaliemhosny18@gmail.com",
      "OrderNum": order.id,
      "OrderDate": order.orderDate,
      "OrderTotal":(order.deliveryMethods.price+order.subTotal),
      "UserName": "Order Done",
      "shippingPrice":order.deliveryMethods.price,
      "SubTotal":order.subTotal,
      // "Address":order.shipToAddress.city



    }
  }



}
