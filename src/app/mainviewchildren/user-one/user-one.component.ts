import { Component, OnInit } from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";
import {User} from "../../auth.service/user.model";

@Component({
  selector: 'app-user-one',
  templateUrl: './user-one.component.html'
})
export class UserOneComponent implements OnInit {
  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
