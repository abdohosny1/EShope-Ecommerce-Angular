import { v4 as uuidv4 } from 'uuid';

export interface IBasketItem {
    id: number;
    productName: string;
    price: number;
    quentity: number;
    pictureURL: string;
    brand: string;
    type: string;
}

export interface IBasket {
    id: string;
    basketItems: IBasketItem[];
    deliveryMethodId?:number;
    clientSecret?:string;
    PaymentIntentedId?:string;
    shippingPrice?:number;
}

export interface IBasketTotal{
    shipping:number;
    supTotal:number;
    total:number;
}

export class Basket implements IBasket{
    id=uuidv4()
    basketItems: IBasketItem[]=[]

}
