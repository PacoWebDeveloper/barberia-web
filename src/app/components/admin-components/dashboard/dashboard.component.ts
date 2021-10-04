import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public scheduleVisible: boolean = false;
  public recentVisible: boolean = false;
  public noticeVisible: boolean = false;
  public reservationVisible: boolean = false;

  @ViewChild('schedules') schedulesView!: ElementRef;
  @ViewChild('recentW') recentWView!: ElementRef;
  @ViewChild('notice') noticeView!: ElementRef;
  @ViewChild('reservation') reservationView!: ElementRef;

  constructor(public router: Router) { }

  ngOnInit(): void {
    this.verifyTypeUser();
  }

  onClick(event: any): void {
    const itemSelected = event.currentTarget.innerText;    
    const componentSelected: any = {
      'Horarios': [
        true,false,false,false
      ],
      'Trabajos recientes': [
        false,true,false,false
      ],
      'Avisos': [
        false,false,true,false
      ],
      'Reservaciones': [
        false,false,false,true
      ]
    }    
    let views:Array<boolean> = componentSelected[itemSelected];

    this.scheduleVisible = views[0];
    this.recentVisible = views[1];
    this.noticeVisible = views[2];
    this.reservationVisible = views[3];

    this.schedulesView.nativeElement.classList.remove('Actived');
    this.recentWView.nativeElement.classList.remove('Actived');
    this.noticeView.nativeElement.classList.remove('Actived');
    this.reservationView.nativeElement.classList.remove('Actived');
    event.currentTarget.classList.add('Actived');

  }

  verifyTypeUser(): boolean {
    let userData: any = localStorage.getItem('User');
    if(userData != undefined)
      userData = JSON.parse(userData);
    if(userData.type == 'admin')
      return true;
    else {
      this.router.navigate(['bienvenida']);
    }
    
    return false;
  }
}
