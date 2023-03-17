import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../../account/account.service';
import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss']
})
export class CheckoutAddressComponent implements OnInit {
@Input() checkOutForm!:FormGroup;
  constructor(private accountService:AccountService,private toaster:ToastrService) { }

  ngOnInit(): void {
  }
  saveUserAddress(){
    this.accountService.updateUserAddress(this.checkOutForm.get('addressForm')?.value).subscribe(
      (address:any)=>{
        this.toaster.success('Address Saved');
        this.checkOutForm.get('addressForm')?.reset(address);
      },error=>{
        this.toaster.error(error.message);
        console.log(error);
      })
  }

}
