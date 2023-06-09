import { CdkStepper } from '@angular/cdk/stepper';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/models/basketItem';
import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss']
})
export class CheckoutReviewComponent implements OnInit {
  @Input() appStepper!:CdkStepper;
  basket$!:Observable<IBasket>;


  constructor(private basketService:BasketService,private tostar:ToastrService) { }

  ngOnInit(): void {
    this.basket$=this.basketService.basket$;
  }

  createPaymentIntent(){
    return this.basketService.createPaymentIntent().subscribe(
      (response:any)=>{
     //  this.tostar.success("Payment Intent Created");
       this.appStepper.next();
      },
      error=>{
       console.log(error);
       // this.tostar.error(error.message);

      }
    )
  }



}
