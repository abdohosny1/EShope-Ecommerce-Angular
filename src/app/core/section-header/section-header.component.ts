import { Observable } from 'rxjs';
//import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
import { Component, OnInit } from '@angular/core';
//import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss']
})
export class SectionHeaderComponent implements OnInit {

  breadcrum!:Observable<any[]>;
  constructor(
   // private bsService:BreadcrumbService
    ) { }

  ngOnInit(): void {
  // this.breadcrum= this.breadcrum = this.bsService.breadcrumbs$;
  }

}
