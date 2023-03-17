import { AccountService } from './../../account/account.service';
import { IUser } from './../../shared/models/user';
import { Observable } from 'rxjs';
import { BasketService } from './../../basket/basket.service';
import { Component, OnInit } from '@angular/core';
import { IBasket } from 'src/app/shared/models/basketItem';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  basket$ ?:Observable<IBasket>;
  curentUser$ ?:Observable<IUser>;

  constructor(private basketService:BasketService,private accountService:AccountService) { }

  ngOnInit(): void {
    this.basket$=this.basketService.basket$;
    this.curentUser$=this.accountService.currentUser$;

  }

  logout(){
    this.accountService.logout();
  }

}
