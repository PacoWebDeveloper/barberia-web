import { Component, OnInit } from '@angular/core';
import { RecentWorksService } from 'src/app/services/recentWorks.service';

@Component({
  selector: 'app-recent-works',
  templateUrl: './recent-works.component.html',
  styleUrls: ['./recent-works.component.css'],
  providers: [RecentWorksService]
})
export class RecentWorksComponent implements OnInit {

  public title: string = '';

  public recentWorksArray: Array<string> = [];

  public url: string = 'http://localhost:3700/api/recent';

  constructor(
    private recentWorksService: RecentWorksService
  ) {
    this.title = 'Trabajos recientes';
  }

  ngOnInit(): void {
    this.getRecentWorks();
  }

  getRecentWorks(): void {
    this.recentWorksService.getRecentWorks().subscribe(
      response => {
        this.recentWorksArray = response.recentWorks.map((item: any) => {
          return item.name;
        })        
      },
      error => {
        console.log(<any>error);
      }
    )
  }

}
