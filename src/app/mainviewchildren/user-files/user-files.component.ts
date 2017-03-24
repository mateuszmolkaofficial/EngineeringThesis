import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FileService} from "../project-files/file.service";
import {FileModel} from "../project-files/file.model";
import {AuthService} from "../../auth.service/auth.service";
import {User} from "../../auth.service/user.model";

@Component({
  selector: 'app-user-files',
  templateUrl: './user-files.component.html',
  styles: []
})
export class UserFilesComponent implements OnInit {

  userName: string;
  private files: FileModel[];
  private isMaster= null;
  constructor(private route: ActivatedRoute, private fileService: FileService) { }

  ngOnInit() {
    this.userName = this.route.snapshot.params['fileUser'];

    this.fileService.getUserFiles(this.userName)
      .subscribe(
        (files: FileModel[])=>{
          this.files=files;
          this.files.reverse();
          console.log(this.files);
        }
      );

  }

  onDelete(file: FileModel){
    var accept= confirm("Are you sure?");
    if(accept){
      this.files.splice(this.files.indexOf(file), 1);
      this.fileService.deleteFile(file)
        .subscribe(data=> console.log(data));
    }
  }

}
