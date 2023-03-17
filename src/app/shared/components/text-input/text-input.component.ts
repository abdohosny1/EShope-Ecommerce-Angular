import { Component, OnInit, ViewChild, ElementRef, Input, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit ,ControlValueAccessor {

  @ViewChild('input',{static:true}) input! :ElementRef;
  @Input() type='text';
  @Input() lable? : string;


  constructor(@Self() public controlDir:NgControl) {
    this.controlDir.valueAccessor=this;
  }

  ngOnInit(): void {
    const control=this.controlDir.control;
    const validitors=control?.validator ? [control.validator] :[];
    const asyncValiditor=control?.asyncValidator ?[control.asyncValidator] :[];

    control?.setValidators(validitors);
    control?.setAsyncValidators(asyncValiditor);
    control?.updateValueAndValidity();

  }

  onChanege(event:any){}

  onTouched(){}


  writeValue(obj: any): void {
    this.input!.nativeElement.value = obj || '';
  }
  registerOnChange(fn: any): void {
    this.onChanege=fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched=fn;
  }



}
