import { IAddress } from "./address"

export interface IOrderToCreate {
  baskeyId: string
  deliveryMethodId: number
  shippingAddress: IAddress
}

export interface IOrder {
  id: number
  buyerEmail: string
  shipToAddress: IAddress
  orderDate: string
  deliveryMethods: string
  shippingPrice: number
  orderItems: IOrderItem[]
  subTotal: number
  total: number
  orderStatus: string
}



export interface IOrderItem {
  productId: number
  productName: string
  picturalURL: string
  price: number
  quentity: number
}
