import { Component, OnInit } from '@angular/core';
import { recent } from 'src/app/models/recent';
import { Global } from 'src/app/services/global';
import { RecentWorksService } from 'src/app/services/recentWorks.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-admin-recent-works',
  templateUrl: './admin-recent-works.component.html',
  styleUrls: ['./admin-recent-works.component.css'],
  providers: [RecentWorksService, UploadService]
})
export class AdminRecentWorksComponent implements OnInit {

  public recentModel: recent;
  public image: any = null;

  public message: string = '';
  public okMessage: string = '';

  constructor(
    private recentWorksService: RecentWorksService,
    private uploadService: UploadService) {
    this.recentModel = new recent('','','');
   }

  ngOnInit(): void {
    
  }

  onSubmit(form: any): void {
    let uploadData: any = localStorage.getItem('User');

    if(uploadData != null) {
      uploadData = JSON.parse(uploadData);
    }
    this.recentModel.user = uploadData.user;
    
    if(this.image != null) {
      
      this.recentWorksService.saveRecentWork(this.recentModel).subscribe(
        response => {
          if(response.recentWork) {
            const { _id } = response.recentWork;
            this.uploadService.makeFileRequest(Global.url + '/recent/uploadImage/' + _id, [], this.image, 'image')
            .then((result: any) => {
              console.log(result);
              this.okMessage = 'Imagen guardada exitosamente';
              this.message = '';
              form.reset();
            })
          }
        },
        error => {
          console.log(<any>error);
        }
      )
    } else {
      this.okMessage = '';
      this.message = 'Seleccione una imagen';
    }
  }

  inputFileChange(image: any): void {
    this.image = <Array<File>>image.target.files;
    this.recentModel.name = this.image[0].name;
  }

}
