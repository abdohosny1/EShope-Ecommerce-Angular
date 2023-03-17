import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.scss']
})
export class ServerErrorComponent implements OnInit {

  error:any;
  constructor(private router:Router) { 

    const navogation=this.router.getCurrentNavigation();
   this.error=navogation?.extras?.state;
    this.error=navogation &&navogation.extras && navogation.extras.state&&navogation.extras.state;
    console.log(this.error);
  }

  ngOnInit(): void {
  }

}
