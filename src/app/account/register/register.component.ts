import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of, switchMap, timer, map } from 'rxjs';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  errors!:string[];
  constructor(private accountService:AccountService,private router:Router,private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  registerForm= this.fb.group({
    email:new FormControl('',[Validators.required,Validators
      .pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
      [this.validateEmailNotTaken()]),
    password:new FormControl('',Validators.required),
    displyName:new FormControl('',Validators.required),
    PhoneNumber:new FormControl('',Validators.required),

    });

  get email() {
    return this.registerForm.get('email')!;
  }
  get displyName(){
    return this.registerForm.get("displyName");
  }

  get password() {
    return this.registerForm.get('password')!;
  }

  public Register(): void {
    if (this.registerForm.invalid) {
      for (const control of Object.keys(this.registerForm.controls)) {
        this.registerForm.controls[control].markAsTouched();
      }
      return;
    }else{
      console.log(this.registerForm.value);
      this.accountService.register(this.registerForm.value).subscribe(
        ()=>{
          this.router.navigateByUrl("/shop")
        },
        (error)=>{
          this.errors=error.errors;
          console.log(error);
        }
      )
    }
  }

  validateEmailNotTaken(): AsyncValidatorFn {

    return control =>{
         return timer(500).pipe(
          switchMap(() =>{
            if(!control.value){
                  return of(null);
            }
            return this.accountService.checkEmailExit(control.value).pipe(
              map(res =>{
                return res ? {emailExists :true} :null;
              })
            )
          })
         )
    };
  }
}
