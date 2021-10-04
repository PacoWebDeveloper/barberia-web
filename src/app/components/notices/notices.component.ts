import { Component, OnInit } from '@angular/core';

import { notice } from 'src/app/models/notices';
import { NoticeService } from 'src/app/services/Notices.service';

@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.css'],
  providers: [NoticeService]
})
export class NoticesComponent implements OnInit {

  public title: string = '';

  public notice_title: string = '';
  public notice_content: string = '';
  public notice_date!: Date;
  public notices_array: Array<any> = [];

  constructor(
    private noticeService: NoticeService
  ) {     
    this.title = 'Avisos';
  }

  ngOnInit(): void {
    this.getNotices();    
  }

  getNotices() {
    this.noticeService.getNotices().subscribe(
      response => {        
        this.notices_array = response.notices.map((item:any) => {
          let date: string = item.date; 
          let day: string = date.substr(8,2); 
          let month: string = date.substr(5,2);
          let year: string = date.substr(0,4);
          let fullDate: string = day + '-' + month + '-' + year;

          item.date = fullDate;

          return item;
        });

        this.notices_array.reverse();
      },
      error => {
        console.log({Error: <any>error});
      }
    )
  }

}
