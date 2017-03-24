import { Component, OnInit } from '@angular/core';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styles: []
})
export class TestComponentComponent implements OnInit {
  public uploader:FileUploader = new FileUploader({url: URL})

  constructor() { }

  ngOnInit() {

  }

  checkIt(){
    console.log(this.uploader);
  }

}
