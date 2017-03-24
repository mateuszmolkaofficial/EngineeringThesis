
import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {FileModel} from "./file.model";
import {Observable} from "rxjs";

@Injectable()
export class FileService {
  constructor(private _http: Http) { }

  createFile(file: FileModel){
    console.log(file);
    const body = JSON.stringify(file);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post('http://localhost:3000/fileupload/create', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  getProjectFiles(projectName: string){
    return this._http.get('http://localhost:3000/fileupload/getfiles/'+projectName)
      .map((response: Response) => {
        const files = response.json().obj;
        let transformedFiles: FileModel[] = [];
        for (let project of files) {
          transformedFiles.push(new FileModel(
            project.fullFileName,
            project.fileExtension,
            project.fileProject,
            project.fileUser,
            project.size,
            project.fileDate
            )
          );
        }
        return transformedFiles;
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  getUserFiles(userName: string){
    return this._http.get('http://localhost:3000/fileupload/getfilesuser/'+userName)
      .map((response: Response) => {
        const files = response.json().obj;
        let transformedFiles: FileModel[] = [];
        for (let project of files) {
          transformedFiles.push(new FileModel(
            project.fullFileName,
            project.fileExtension,
            project.fileProject,
            project.fileUser,
            project.size,
            project.fileDate
            )
          );
        }
        return transformedFiles;
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  deleteFile(file: FileModel){
    var fullFileName= file.fullFileName;
    var fileUser= file.fileUser;
    var fileDate= file.fileDate;
    var fileProject= file.fileProject;
    return this._http.delete('http://localhost:3000/fileupload/delete/' +
      fullFileName + "/"+ fileUser + "/"+ fileDate+ "/"+ fileProject)
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

}
