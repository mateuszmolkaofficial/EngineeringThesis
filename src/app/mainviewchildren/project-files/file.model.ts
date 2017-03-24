export class FileModel {
  constructor(
    public fullFileName: string,
    public fileExtension: string,
    public fileProject: string,
    public fileUser: string,
    public size: number,
    public fileDate: string
  ) {}
}
