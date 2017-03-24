import { Injectable } from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Project} from "./project.model";

@Injectable()
export class ProjectService {
  constructor(private _http: Http) { }

  createProject(project: Project){
    console.log(project);
    const body = JSON.stringify(project);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post('http://localhost:3000/project/create', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }
  

  getProjects(){
    return this._http.get('http://localhost:3000/project/getprojects')
      .map((response: Response) => {
        const projects = response.json().obj;
        let transformedProjects: Project[] = [];
        for (let project of projects) {
          transformedProjects.push(new Project(
            project.projectName,
            project.projectType
            )
          );
        }
        return transformedProjects;
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }
  deleteProject(project: Project){
    var projectName= project.projectName;
    return this._http.delete('http://localhost:3000/project/delete/' + projectName)
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

}
