import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import { UserService } from 'src/app/services/User.service';

@Component({
  selector: 'app-admin-reservation',
  templateUrl: './admin-reservation.component.html',
  styleUrls: ['./admin-reservation.component.css'],
  providers: [ReservationService, UserService]
})
export class AdminReservationComponent implements OnInit {

  public date: Date = new Date;
  public month: number;

  public reservations: Array<any> = [];  

  constructor(
    private reservationService: ReservationService,
    private userService: UserService
    ) { 
      this.month = this.date.getMonth();
    }

  ngOnInit(): void {
    this.getReservations({month: this.getMonth(this.date.getMonth() + 1)});      
  }

  getMonth(monthSelected: any): number {
    const months: any = {
      'Enero': 1,
      'Febrero': 2,
      'Marzo': 3,
      'Abril': 4,
      'Mayo': 5,
      'Junio': 6,
      'Julio': 7,
      'Agosto': 8,
      'Septiembre': 9,
      'Octubre': 10,
      'Noviembre': 11,
      'Diciembre': 12
    };
    monthSelected = isNaN(monthSelected) ? months[monthSelected] : monthSelected;
    
    return monthSelected;
  }

  getReservations(month: any): void {
    this.reservationService.getAllReservations(month).subscribe(
      response => {
        this.reservations = response.reservationsFound.map((item: any) => {
          return item;
        })
        
        this.getClientName();        
      },
      error => {
        console.log(<any>error);
      }
    )    
    
  }

  getClientName(): void {
    let lastId: string = '';
    let ids: Array<string> = [];
    ids = this.reservations.map((item: any, index: number) => {
      
      if(lastId != item.user_id) {
        return item.user_id;
      }
      else {
        lastId = item.user_id;
        return lastId;
      }       
    });

    ids.forEach(element => {
      if(element != undefined) {
        this.userService.getClientName(element).subscribe(
          res => {
            this.reservations.forEach((element: any) => {
              if (element.user_id == res.userFound._id) {
                element.user_id = res.userFound.user;                
              }
            });
            
          },
          err => {
            console.log(<any>err);
          }
        )
      }
    });

  }

}
