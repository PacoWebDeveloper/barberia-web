import { Component, OnInit } from '@angular/core';
import { notice } from 'src/app/models/notices';
import { NoticeService } from 'src/app/services/Notices.service';

@Component({
  selector: 'app-admin-notices',
  templateUrl: './admin-notices.component.html',
  styleUrls: ['./admin-notices.component.css'],
  providers: [NoticeService]
})
export class AdminNoticesComponent implements OnInit {

  public notice: notice;
  public date: Date;

  public message: string = '';
  public okMessage: string = '';

  constructor(
    private noticeService: NoticeService
  ) { 
    this.date = new Date;    
    this.notice = new notice('','','',this.date);
  }

  ngOnInit(): void {

  }

  validateData(form: any): boolean {
    this.message = '';
    this.okMessage = '';
    var errorTitle = false;

    const specialCharactersTitle: String = '@|°¬!"#$%&/()=?¡¿+¨*{}[],.<>-;:_' + "'";

    const data = form.form.value;

    for(let element in data) {
      data[element] = data[element].trim().toLowerCase();

        if(element == 'title'){

          for(let i = 0; i < specialCharactersTitle.length; i++) {
            for(let a = 0; a < data[element].length; a++) {
              if(data[element].charAt(a) == specialCharactersTitle.charAt(i))
                errorTitle = true;
            }
          }

          if(data[element] == '') {
            errorTitle = true;
          }

        }
    }

    if(errorTitle)
      this.message = 'Error en Titulo';

    if(this.message == '')
      return true;
    else
      return false;
  }

  onSubmit(form: any): void {

    if(this.validateData(form)) {
      this.notice.date = new Date;
      
      this.noticeService.saveNotice(this.notice).subscribe(
        response => {
          this.okMessage = 'Aviso guardado con exito';
          form.reset();
        },
        error => {
          console.log(<any>error);
        }
      )
    }
  }

}
