import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormControl} from "@angular/forms";
import {User} from "../../auth.service/user.model";
import {AuthService} from "../../auth.service/auth.service";
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload';

const URL = 'http://localhost:3000/upload';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html'
})
export class CreateUserComponent implements OnInit {

  myForm: FormGroup;
  public uploader:FileUploader = new FileUploader({url: URL})

  constructor(private authService: AuthService) { }


  onSubmit() {
    const user = new User(
      this.myForm.value.firstName,
      this.myForm.value.lastName,
      this.myForm.value.email,
      this.myForm.value.userName,
      this.myForm.value.password,
      this.myForm.value.type,
      this.uploader.queue[0].file.name.split('.')[0],
      this.uploader.queue[0].file.name.split('.')[1]
    );
    this.authService.createUser(user)
      .subscribe(
        data => {
          console.log(data);
          //noinspection TypeScriptUnresolvedVariable
          let userName = data.obj.userName;
          let element= this.uploader.queue[0];
          console.log(element);
          element.url=URL + '/?userName='+userName;
          element.upload();

        },
        error => console.error(error)
      );
    this.myForm.reset();

  }

  ngOnInit() {
    this.myForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]),
      userName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required)
    });
  }

}
