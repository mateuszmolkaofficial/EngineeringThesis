import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload';
import {AuthService} from "../../auth.service/auth.service";
import {User} from "../../auth.service/user.model";
import {FileModel} from "./file.model";
import {FileService} from "./file.service";

const URL = 'http://localhost:3000/upload-file';

@Component({
  selector: 'app-project-files',
  templateUrl: './project-files.component.html',
  styles: []
})
export class ProjectFilesComponent implements OnInit {
  private projectName: string;
  private currentDate: Date;
  private currentDateString: string;
  private isMaster= null;

  private correctUpload=false;
  private wrongUpload=false;

  currentUser: User = {firstName: '', lastName: '', email: '', userName: '',password: '',type: '', imagename: '', imageext: ''};
  public uploader:FileUploader = new FileUploader({url: URL})
  private files: FileModel[];

  constructor(private route: ActivatedRoute, private authService: AuthService, private fileService: FileService) { }

  ngOnInit() {
    this.projectName = this.route.snapshot.params['projectName'];
    this.currentDate= new Date();
    this.currentDateString=this.currentDate.getDate()+'.'+(this.currentDate.getMonth()+1)+'.'+this.currentDate.getFullYear()+' '+this.currentDate.getHours()+':'+this.currentDate.getMinutes();
    this.authService.getCurrentUser()
      .subscribe((data)=>{
        //noinspection TypeScriptUnresolvedVariable
        this.currentUser=new User(data.obj.firstName,data.obj.lastName,data.obj.email,data.obj.userName,data.obj.password,data.obj.type,data.obj.imagename, data.obj.imageext);
        //noinspection TypeScriptUnresolvedVariable
        if(this.currentUser.type==='Master designer'){
          this.isMaster=true;
        }
        else{
          this.isMaster=false;
        }
      });
    this.fileService.getProjectFiles(this.projectName)
      .subscribe(
        (files: FileModel[])=>{
          this.files=files;
          this.files.reverse();
          console.log(this.files);
        }
      );
  }

  onUpload(){
    for (let item of this.uploader.queue){
      if(item.file.name.split('.')[1]!=="CATPart" &&
        item.file.name.split('.')[1]!=="CATProduct" &&
        item.file.name.split('.')[1]!=="dwg"){
        this.wrongUpload=true;
      }
    }
    if (!this.wrongUpload){
      for (let item of this.uploader.queue) {
        const file = new FileModel(
          item.file.name,
          item.file.name.split('.')[1],
          this.projectName,
          this.currentUser.userName,
          item.file.size,
          this.currentDateString
        );
        this.fileService.createFile(file)
          .subscribe(
            data=>{console.log(data)
              if (data.message==='success'){
                this.correctUpload=true;
              }
            }
          );
        this.files.push(file);
        this.files.reverse();
        item.url=URL + '/?projectName='+this.projectName;
        item.upload();
      }
    }

  }

  onDownload(file: FileModel){
    var path= "http://localhost:3000/fileupload/download/"+file.fullFileName+"/"+file.fileProject;
    window.open(path);
  }


  onFinish(){
    this.correctUpload=false;
    this.wrongUpload=false;
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
