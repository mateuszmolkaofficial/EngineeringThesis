import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormControl} from "@angular/forms";
import {AuthService} from "../auth.service/auth.service";
import {User} from "../auth.service/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {
  myForm: FormGroup;
  userName: string;
  loggedIn= null;

  constructor(private authService: AuthService,private  router: Router) { }

  onSubmit() {
    const user = new User(null,null,
      this.myForm.value.email,null,this.myForm.value.password,
      null,null,null);
    console.log(user);
    this.authService.signin(user)
      .subscribe(
        data=>{
          console.log(data);
          localStorage.setItem('token', data.token);
          //noinspection TypeScriptUnresolvedVariable
          localStorage.setItem('userId', data.userId);
          this.router.navigate(['main']);
          this.userName=data.userName;
        },
        error=> console.log(error)
      );
    this.myForm.reset();
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]),
      password: new FormControl(null, Validators.required)
    });

    this.loggedIn= this.authService.isLoggedIn();
    if(this.loggedIn){
      this.router.navigate(['main']);
    }
  }

}
