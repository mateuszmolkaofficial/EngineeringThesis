import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth.service/auth.service";
import {User} from "../../auth.service/user.model";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {
  user: User = {firstName: '', lastName: '', email: '', userName: '',password: '',type: '', imagename: '', imageext: ''};
  isMaster=null;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getCurrentUser()
      .subscribe((data)=>{
        //noinspection TypeScriptUnresolvedVariable
        //console.log(data.obj.email,data.obj.password,data.obj.userName);
        //noinspection TypeScriptUnresolvedVariable
        //noinspection TypeScriptUnresolvedVariable
        this.user=new User(data.obj.firstName,data.obj.lastName,data.obj.email,data.obj.userName,data.obj.password,data.obj.type,data.obj.imagename, data.obj.imageext);
        //noinspection TypeScriptUnresolvedVariable

        if(this.user.type==='Master designer'){
          this.isMaster=true;
        }
        else{
          this.isMaster=false;
        }
      });

  }
}
