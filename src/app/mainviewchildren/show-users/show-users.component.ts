import { Component, OnInit } from '@angular/core';
import {User} from "../../auth.service/user.model";
import {AuthService} from "../../auth.service/auth.service";

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html'
})
export class ShowUsersComponent implements OnInit {
  isMaster= null;
  users: User[];
  constructor(private authService: AuthService) { }


  onDelete(user: User){
    var accept= confirm("Are you sure?");
    if(accept){
      this.users.splice(this.users.indexOf(user), 1);
      this.authService.deleteUser(user)
        .subscribe(data=> console.log(data));
    }
  }


  ngOnInit() {
    this.authService.getUsers()
      .subscribe(
        (users: User[])=>{
          this.users=users;
          console.log(this.users);
        }
      );

    this.authService.getCurrentUser()
      .subscribe((data)=>{
        //noinspection TypeScriptUnresolvedVariable
        //noinspection TypeScriptUnresolvedVariable
        if(data.obj.type==='Master designer'){
          this.isMaster=true;
        }
        else{
          this.isMaster=false;
        }
      });

  }

}
