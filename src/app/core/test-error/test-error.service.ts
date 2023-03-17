import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestErrorService {

  constructor(private http:HttpClient) { }

  get404Error(){
    return this.http.get(environment.BASE_URL+environment.PRODUCT+"/42");
  }

  get500Error(){
    return this.http.get(environment.BASE_URL+environment.BUGGY+"/servererror");
  }

  get400Error(){
    return this.http.get(environment.BASE_URL+environment.BUGGY+"/badrequest");
  }

  get400ValidationError(){
    return this.http.get(environment.BASE_URL+environment.PRODUCT+"/fortytwo");
  }
}
