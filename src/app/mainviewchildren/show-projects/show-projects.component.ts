import { Component, OnInit } from '@angular/core';
import {Project} from "../create-project/project.model";
import {AuthService} from "../../auth.service/auth.service";
import {ProjectService} from "../create-project/project.service";

@Component({
  selector: 'app-show-projects',
  templateUrl: './show-projects.component.html',
  styles: []
})
export class ShowProjectsComponent implements OnInit {

  isMaster= null;
  projects: Project[];

  constructor(private authService: AuthService, private projectService: ProjectService) { }

  onDelete(project: Project){
    var accept= confirm("Are you sure?");
    if(accept){
      this.projects.splice(this.projects.indexOf(project), 1);
      this.projectService.deleteProject(project)
        .subscribe(data=> console.log(data));
    }
  }

  ngOnInit() {
    this.projectService.getProjects()
      .subscribe(
        (projects: Project[])=>{
          this.projects=projects;
          console.log(this.projects);
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
