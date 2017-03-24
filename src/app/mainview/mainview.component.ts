import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service/auth.service";
import { Router} from "@angular/router";
import {User} from "../auth.service/user.model";

@Component({
  selector: 'app-mainview',
  templateUrl: './mainview.component.html'
})
export class MainviewComponent implements OnInit {

  isLoggedIn= null;
  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
  this.isLoggedIn= this.authService.isLoggedIn();
    if(!this.isLoggedIn){
      this.router.navigate(['login']);
    }
  }


}
