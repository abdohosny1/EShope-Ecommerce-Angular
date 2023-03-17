import { IDeliveryMethod } from './../shared/models/deliveryMethod';
import { IProduct } from 'src/app/shared/models/Iproduct';
import { Basket, IBasket, IBasketItem } from './../shared/models/basketItem';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject, map } from 'rxjs';
import { __values } from 'tslib';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private basketSource=new BehaviorSubject<any>(null);
  private basketTotalSource=new BehaviorSubject<any>(null);

  //private customer: Subject<IBasket> = new ReplaySubject<IBasket>(null);


  basket$=this.basketSource.asObservable();
  basketTotal$=this.basketTotalSource.asObservable();
  shipping=0;

  constructor(private  http:HttpClient) { }

  createPaymentIntent(){

    return this.http.post(environment.BASE_URL+environment.PAYMENT+"/"+this.getCurrentBasketValue().id,{})
    .pipe(
      map((basket:any)=>{
        this.basketSource.next(basket);
       // console.log(this.getCurrentBasketValue());
      })
    );
  }

 setShipping(deliveryMethod:IDeliveryMethod){
  this.shipping=deliveryMethod.price;
  const basket=this.getCurrentBasketValue();
  basket.deliveryMethodId=deliveryMethod.id;
  basket.shippingPrice=deliveryMethod.price;
  this.CalculatTotal();
 this.setBasket(basket);
 }

  getBasket(id:string){
    return this.http.get(environment.BASE_URL+environment.BASKET+"?id="+id)
    .pipe(
      map((basket:any)=>{
        this.basketSource.next(basket);
        this.shipping=basket.shippingPrice;
        this.CalculatTotal()
      //  console.log(this.getCurrentBasketValue())

      })
    );
  }

  setBasket(basket:IBasket){
        return this.http.post(environment.BASE_URL+environment.BASKET,basket)
          .subscribe((response:any)=>{
            this.basketSource.next(response)
            this.CalculatTotal()

console.log(response)
          }, error=>{
            console.log(error)
          }
          )
  }


  getCurrentBasketValue(){
    return this.basketSource.value;
  }

  addItemToBasket(item:IProduct,quentity=1){
    const itemToAdd:IBasketItem=mapProductItemToBasketItem(item,quentity)
    const basket=this.getCurrentBasketValue() ??this.createBasket()
    basket.basketItems=this.addOrUpdate(basket.basketItems,itemToAdd,quentity)
    this.setBasket(basket);

  }

  incremeantItem(item:IBasketItem){
           const basket=this.getCurrentBasketValue();
           const findItemIndex=basket.basketItems.findIndex((x:any) => x.id === item.id);
           basket.basketItems[findItemIndex].quentity++;
           this.setBasket(basket);
  }

  deincremeantItem(item:IBasketItem){
    const basket=this.getCurrentBasketValue();
    const findItemIndex=basket.basketItems.findIndex((x:any) => x.id === item.id);
    if(basket.basketItems[findItemIndex].quentity >1){
      basket.basketItems[findItemIndex].quentity--;
    }else{
      this.removeItemFromBasket(item);
    }
    this.setBasket(basket);
}
  removeItemFromBasket(item: IBasketItem) {
    const basket=this.getCurrentBasketValue();
    if(basket.basketItems.some((x:any)=> x.id=== item.id)){
      basket.basketItems =basket.basketItems.filter((i:any)=> i.id !== item.id)
      if(basket.basketItems.length >0){
        this.setBasket(basket);
      }else{
        this.deleteBasket(basket);
      }

    }
  }

  deleteLocalBasket(id:string){
   this.basketSource.next(null);
   this.basketTotalSource.next(null);
   localStorage.removeItem('basket_id')


  }
  deleteBasket(basket: IBasket) {
    return this.http.delete(environment.BASE_URL+environment.BASKET+'?id='+basket.id).subscribe(()=>{
        this.basketSource.next(null);
        this.basketTotalSource.next(null);
        localStorage.removeItem('basket_id')

      },
      error=>{
        console.log(error)
      }
    );
  }
  private CalculatTotal(){
    const basket=this.getCurrentBasketValue();
    const shipping=this.shipping;
    const supTotal=basket.basketItems.reduce( (a:any, b:any ) => (b.price * b.quentity)+ a, 0 );
    console.log('sub total ='+supTotal)
    const total=supTotal+shipping;
    this.basketTotalSource.next({shipping,total,supTotal})
  }
  private addOrUpdate(basketItems: IBasketItem[], itemToAdd: IBasketItem, quentity: number): IBasketItem[] {
    console.log(basketItems)
    const index=basketItems.findIndex(i=> i.id === itemToAdd.id);
    if(index === -1){
      itemToAdd.quentity=quentity;
      basketItems.push(itemToAdd)
    }else{
      basketItems[index].quentity +=quentity
    }
    return basketItems;
  }
 private createBasket(): IBasket {

  const basket=new Basket()
  localStorage.setItem("basket_id",basket.id)
  return basket;
  }
}
function mapProductItemToBasketItem(item: IProduct, quentity: number): IBasketItem {
  return {
    id:item.id,
    productName:item.name,
    price:item.price,
    pictureURL:item.pictureUrl,
    quentity,
    brand:item.productBrand,
    type:item.productType
  };
}

