import { IProductType } from './../shared/models/productType';
import { IBrand } from './../shared/models/brand';
import { ShopService } from './shop.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../shared/models/Iproduct';
import { ShowPrams } from '../shared/models/showPrams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  @ViewChild ('search',{static:false}) searchTerm!:ElementRef;
  product:Array<IProduct>=[];
  productTest:any;
  brand:Array<IBrand>=[];
  type:Array<IProductType>=[];
showPrams!: ShowPrams;
totalCount:any;
   sortOption=[
      {name:'Alphabetical',value:'name'},
      {name:'Price : Low to Hight',value:'priceAsc'},
      {name:'Price : Hight to Low',value:'priceDesc'},


   ];

  errorMassage: any;


  constructor(private service:ShopService) {
    this.showPrams=this.service.getShowParams();
   }

  ngOnInit(): void {
  this.getProduct();
  this.getProductBrand();
  this.getProductType();
  }

  getProduct(){
    this.service.getProduct().subscribe(
      (response)=>{
        this.productTest=response?.data;
        this.showPrams.pageNumber!=response?.pageIndex;
        this.showPrams.pageNumber!=response?.pageSize;
        this.totalCount=response?.count;

        console.log( response);

      },
      (error)=>{
           console.log(error);
           this.errorMassage=error;
      }
    )
  }

  getProductBrand(){
    this.service.getproductBrand().subscribe(
      (response=>{
       this.brand=[{id:0,name:"All"},...response];
       console.log("brand ="+this.brand);
      }),(error)=>{
       console.log(error);
      }
    )
  }

  getProductType(){
    this.service.getproductType().subscribe(
      (response=>{
       this.type=[{id:0,name:"All"},...response];
      }),(error)=>{
       console.log(error);
      }
    )
  }

  onBrandSelected(brandId:number){
    const parms=this.service.getShowParams();
    parms.brandId=brandId;
    parms.pageNumber=1;
    this.service.setShowPrams(parms);
    this.getProduct();
  }

  onTypeSelected(typeId:number){
    const parms=this.service.getShowParams();
    parms.typeId=typeId;
    parms.pageNumber=1;
    this.service.setShowPrams(parms);
    this.getProduct();
  }

  onSordSelected(sort:string){
    const parms=this.service.getShowParams();
    parms.sort=sort;
    this.service.setShowPrams(parms);
    this.getProduct();

  }

  onPageChange(event:any){
    const parms=this.service.getShowParams();
    if(parms.pageNumber !== event){
      parms.pageNumber=event;
      this.service.setShowPrams(parms);
      this.getProduct();
    }

  }

  onSearch(){
    const parms=this.service.getShowParams();
    parms.search=this.searchTerm.nativeElement.value;
    parms.pageNumber=1;
    this.service.setShowPrams(parms);
    this.getProduct();
  }

  onResat(){
    this.searchTerm.nativeElement.value="";
   const parms=new ShowPrams();
   this.service.setShowPrams(parms);
    this.getProduct();
  }
}
