import { Component, OnInit } from '@angular/core';
import { TestErrorService } from './test-error.service';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {
  
  valadiationError:any;
  constructor(private service:TestErrorService) { }

  ngOnInit(): void {

 
  }

  get500Error(){
    this.service.get500Error().subscribe(
      (response)=>{
        console.log(response);
      },(error)=>{
        console.log(error);
      }
    )
  }

  get400Error(){
    this.service.get400Error().subscribe(
      (response)=>{
        console.log(response);
      },(error)=>{
        console.log(error);
      }
    )
  }

  get404Error(){
    this.service.get404Error().subscribe(
      (response)=>{
        console.log(response);
      },(error)=>{
        console.log(error);
      }
    )
  }

  get400ValidationError(){
    this.service.get400ValidationError().subscribe(
      (response)=>{
        console.log(response);
      },(error)=>{
        console.log(error);
        this.valadiationError=error.errors;

      }
    )
  }

}
