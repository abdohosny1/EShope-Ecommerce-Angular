import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from './../account.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

//oginForm!:FormGroup;
retutnUrl!:string;

  constructor(private accountService:AccountService
    ,private router:Router,
    private fb:FormBuilder
  ,private activeRout:ActivatedRoute ) { }

  ngOnInit(): void {
    this.retutnUrl=this.activeRout.snapshot.queryParams?.['returnUrl'] || '/shop';
   // this.createLoginForm();
  }

  // createLoginForm(){
  //  var  loginForm= this.fb.group({
  //   email:new FormControl('',[Validators.required,Validators
  //     .pattern('[\w-]+@([\w-]+\.)+[\w-]+')]),
  //   password:new FormControl('',Validators.required),
  //   });
  // }
    loginForm= this.fb.group({
    email:new FormControl('',[Validators.required,Validators
      .pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password:new FormControl('',Validators.required),
    });

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }
  public validate(): void {
    if (this.loginForm.invalid) {
      for (const control of Object.keys(this.loginForm.controls)) {
        this.loginForm.controls[control].markAsTouched();
      }
      return;
    }else{
      this.accountService.login(this.loginForm.value).subscribe(
        ()=>{
          this.router.navigateByUrl(this.retutnUrl)
        },
        (error)=>{
          console.log(error);
        }
      )
    }
  }



}
