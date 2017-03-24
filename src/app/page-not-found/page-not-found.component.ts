import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
  <div class="col-md-8 col-md-offset-2">
    <h1>404-PAGE NOT FOUND</h1>
    <hr>
    <button [routerLink]="['/']" >Back to main/login page</button>
  </div>
    
  `,
  styles: []
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
