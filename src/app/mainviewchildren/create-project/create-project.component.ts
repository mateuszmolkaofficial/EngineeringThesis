import { Component, OnInit } from '@angular/core';
import {Validators, FormControl, FormGroup} from "@angular/forms";
import {Project} from "./project.model";
import {ProjectService} from "./project.service";

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html'
})
export class CreateProjectComponent implements OnInit {

  myForm: FormGroup;

  constructor(private projectService: ProjectService) { }


  onSubmit() {
    const project = new Project(
      this.myForm.value.projectName,
      this.myForm.value.projectType,
    );

    this.projectService.createProject(project)
      .subscribe(
        data=>console.log(data),
        error=>console.log(error)
      );
    this.myForm.reset();
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      projectName: new FormControl(null, Validators.required),
      projectType: new FormControl(null, Validators.required)
    });
  }


}
