import { AccountService } from './../../account/account.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import {  map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountService:AccountService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.accountService.currentUser$.pipe(
      map((auth:any)=>{
         if( auth ){
          return true;
        }
          this.router.navigate(['account/login'] ,{queryParams:{returnUrl:state.url}});
          return false;

      })
    );
  }

}
