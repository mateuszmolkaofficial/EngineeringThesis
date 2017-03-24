import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../auth.service/auth.service";
import {User} from "../../auth.service/user.model";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {
  userName: string;
  user: User = {firstName: '', lastName: '', email: '', userName: '',password: '',type: '', imagename: '', imageext: ''};
  constructor(private route: ActivatedRoute,private router: Router,private authService: AuthService) { // 2

  }

  ngOnInit() {
    this.userName = this.route.snapshot.params['username']; // 3
    this.authService.getUser(this.userName)
      .subscribe(
        (data)=>{
        //noinspection TypeScriptUnresolvedVariable
        //console.log(data.obj.email,data.obj.password,data.obj.userName);
        //noinspection TypeScriptUnresolvedVariable
        //noinspection TypeScriptUnresolvedVariable
        var object=data.obj[0];
        this.user=new User(object.firstName,object.lastName,object.email,object.userName,object.password,object.type, object.imagename, object.imageext);
        //noinspection TypeScriptUnresolvedVariable
      },
      (error)=>{
      console.log(error);
      this.router.navigate(['main']);
    });


}}
