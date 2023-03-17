import { Paganation } from './../shared/models/pagantion';
import { IBrand } from './../shared/models/brand';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPaganation } from '../shared/models/pagantion';
import { IProductType } from '../shared/models/productType';
import { map, of } from 'rxjs';
import { ShowPrams } from '../shared/models/showPrams';
import { IProduct } from '../shared/models/Iproduct';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  productss:IProduct[]=[];
  brands:IBrand[]=[];
  type:IProductType[]=[];
  paganization =new Paganation();
  showPrams=new ShowPrams();


  constructor(private http:HttpClient) { }

  getProduct(){
    let parms=new HttpParams();

    if(this.showPrams.brandId !==0){
      parms=parms.append("brandId",this.showPrams.brandId.toString());
    }
    if(this.showPrams.typeId !==0){
      parms=parms.append("typeId",this.showPrams.typeId.toString());
    }

    if(this.showPrams.search){
      parms=parms.append("Search",this.showPrams.search);

    }
    // if(showPrams.sort){
      parms=parms.append("sort",this.showPrams.sort);
      parms=parms.append("PageIndex",this.showPrams.pageNumber.toString());
      parms=parms.append("PageSize",this.showPrams.pageSize.toString());

    // }

    return this.http.get<IPaganation>(environment.BASE_URL+environment.PRODUCT,{observe:'response',params:parms})
        .pipe(
          map(
            response=>{
              // this.productss!=response.body?.data;
              // return response.body;
              this.productss=[...this.productss,...response!.body!.data];//[...this.productss, ...response.body?.data];
              console.log("wwwwwwwwwwwwwwwwwwwww");
              console.log(response.body);
              this.paganization!=response.body;
                 return response.body//this.paganization; //response.body;
            }
          )
        );
  }

  getproductBrand(){
    if(this.brands!.length > 0){
      return of( this.brands );

    }
    return this.http.get<IBrand[]>(environment.BASE_URL+environment.PRODUCT+"/"+environment.BRAND).pipe(
      map(reponse =>{
        this.brands=reponse;
        return reponse;
      })
    );
  }

  getproductType(){
    if(this.type!.length > 0){
      return of( this.type );

    }
    return this.http.get<IProductType[]>(environment.BASE_URL+environment.PRODUCT+"/"+environment.TYPE).pipe(
      map(response =>{
        this.type=response;
        return response;
      })
    );
  }

  getProductById(id:number){
    const product=this.productss?.find(p=>p.id==id);
    if(product){
      return of( product );
    }
    return this.http.get<IProduct>(environment.BASE_URL+environment.PRODUCT+"/"+id);
  }


setShowPrams(params:ShowPrams){
   this.showPrams=params;
}

getShowParams(){
  return this.showPrams;
}
}
