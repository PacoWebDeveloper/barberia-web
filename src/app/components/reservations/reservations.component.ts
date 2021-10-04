import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/User.service';
import { Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
  providers: [UserService, ReservationService]
})
export class ReservationsComponent implements OnInit {

  public title: string = 'Reservaciones';

  public user: any;
  public showAlert: boolean = false;

  public date: Date = new Date;
  public day: number = 0;
  public month: number = 0;
  public year: number = 0;
  public name_day: string = '';
  public name_month: string = '';

  public nextDay: number = 0;
  public nextMonth: number = 0;
  public nextYear: number = 0;
  public nextName_day: string = '';
  public nextName_month: string = '';
  public nextHour: string = '';
  public nextReservation: Array<any> = [];
  public otherReservations: Array<any> = [];
  public showReservation: boolean = false;
  public showOtherReservations: boolean = false;

  public reservDay: string = '';
  public reservMonth: string = '';
  public reservYear: string = '';
  public reservHour: string = '';
  public reservId: any = {};

  public textButton: string = 'Reservar';
  public showFormBoolean: boolean = false;
  public editFormBoolean: boolean = false;
  @ViewChild('button')button!: ElementRef;
  @ViewChild('changeBtns')changeBtns! : ElementRef;

  constructor(
    private userService: UserService,
    private router: Router,
    private reservationService: ReservationService
  ) {
  }

  ngOnInit(): void {
    if (this.auth_Session()) {
      this.showAlert = false;
      this.showDate();
      this.getReservations();
    }
    else {
      this.showAlert = true;
    }
  }

  auth_Session(): boolean {
    this.user = this.userService.auth_session();

    if (this.user.session == true) return true;

    return false;
  }

  redirect(): void {
    let prevUrl = window.location.href;
    prevUrl = prevUrl.substr(22);
    localStorage.setItem('prevUrl', prevUrl);
    this.router.navigate(['login']);
  }
////////////////////////////////////////////////////////////////////////////////////////////////////////
  showDate(): void {
    this.day = this.date.getDate();
    this.month = this.date.getMonth();
    this.year = this.date.getFullYear();
    this.name_day = this.changeNumberToNameDay(this.date.getDay());
    this.name_month = this.changeNumberToNameMonth(this.month);
  }

  changeNumberToNameDay(day: number): string {
    const days: any = {
      0: 'Domingo',
      1: 'Lunes',
      2: 'Martes',
      3: 'Miercoles',
      4: 'Jueves',
      5: 'Viernes',
      6: 'Sabado'
    };
    return days[day];
  }

  changeNumberToNameMonth(month: number): string {
    const months: any = {
      0: 'Enero',
      1: 'Febrero',
      2: 'Marzo',
      3: 'Abril',
      4: 'Mayo',
      5: 'Junio',
      6: 'Julio',
      7: 'Agosto',
      8: 'Septiembre',
      9: 'Octubre',
      10: 'Noviembre',
      11: 'Diciembre'
    };
    return months[month];
  }
////////////////////////////////////////////////////////////////////////////////////////////////////////
  getReservations(): void {
    const user_id: string = this.user.user._id;
    this.reservationService.getReservations(user_id).subscribe(
      response => {
        this.nextReservation = response.reservations;
        
        const reservationObject = this.nextReservation.map(item => {
          if (
            parseInt(item.cut_year) >= this.date.getFullYear() &&
            parseInt(item.cut_month) >= (this.date.getMonth() + 1)
          ) {
            return item.cut_month == (this.date.getMonth() + 1) && item.cut_day < this.date.getDate() ?
              undefined : item;
          }
        })

        let allUndefined = true;
        reservationObject.forEach((element) => {
          if(element != undefined)
            allUndefined = false;
        });

        if(!allUndefined){
          this.showReservation = true;
          
          reservationObject.sort((a:any, b:any):any => {
            return a.cut_day - b.cut_day;
          })
          reservationObject.sort((a:any, b:any):any => {
            return a.cut_month - b.cut_month;
          })  
          this.nextReservation = reservationObject;
          this.showNextReservation(reservationObject);
        } else
          this.showReservation = false;     
      },
      error => {        
        console.log(<any>error);
      }
    );
  }

  showNextReservation(object: any) {
    this.nextDay = object[0].cut_day;
    this.nextMonth = object[0].cut_month;
    this.nextMonth = parseInt(object[0].cut_month);
    this.nextName_month = this.changeNumberToNameMonth(this.nextMonth - 1);
    this.nextYear = object[0].cut_year;
    this.nextHour = object[0].cut_hour;

    const nextDate = new Date(this.nextYear,(this.nextMonth - 1),this.nextDay);
    this.nextName_day = this.changeNumberToNameDay(nextDate.getDay());
    
    this.otherReservations = [];
    for(let i = 0; i < object.length; i++) {
      if(i + 1 < object.length){
          if (object[i + 1] != undefined) {
            this.otherReservations[i] = object[i + 1].cut_day + ' de ' + 
            this.changeNumberToNameMonth(object[i + 1].cut_month - 1) + ' del ' +
            object[i + 1].cut_year + ' a las ' + object[i + 1].cut_hour;
          }
      }
    }
    this.nextReservation[this.nextReservation.length - 1] = '';
    
    if(this.otherReservations.length > 0)
      this.showOtherReservations = true;
    else this.showOtherReservations = false;
      
  }

  showForm(): void {
    if(this.showFormBoolean) {
      this.showFormBoolean = false;
      this.textButton = 'Reservar';    
      this.button.nativeElement.style.backgroundColor = 'rgb(0,89,255)';
      this.button.nativeElement.style.border = '2px solid rgb(0,89,255)';
    } else {
      this.showFormBoolean = true;
      this.textButton = 'Cancelar';
      this.button.nativeElement.style.backgroundColor = 'rgb(240,0,0)';
      this.button.nativeElement.style.border = '2px solid rgb(240,0,0)';      
    }
  }

  mouseOver(): void {
    if(this.showFormBoolean) {
      this.button.nativeElement.style.backgroundColor = 'rgb(240,0,0,0.8)';
      this.button.nativeElement.style.border = '2px solid rgb(240,0,0,0.5)';
    } else {
      this.button.nativeElement.style.backgroundColor = 'rgb(0,89,255,0.8)';
      this.button.nativeElement.style.border = '2px solid rgb(0,89,255,0.5)';
    }
  }

  mouseOut(): void {
    if(this.showFormBoolean) {
      this.button.nativeElement.style.backgroundColor = 'rgb(240,0,0)';
      this.button.nativeElement.style.border = '2px solid rgb(240,0,0)';
    } else {
      this.button.nativeElement.style.backgroundColor = 'rgb(0,89,255)';
      this.button.nativeElement.style.border = '2px solid rgb(0,89,255)';
    }
  }

  refresh(event: boolean) {
    if(event){
      this.getReservations();
      this.showForm();
      this.changeBtns.nativeElement.style.display = 'none';
    }
  }

  getReservInfo(event: any): void {
    let reservInfo: string = event.currentTarget.innerText;

    let dateArray: Array<string> = reservInfo.split(' ');
    
    if(isNaN(parseInt(dateArray[0]))){
      this.reservDay = dateArray[1];
      this.reservMonth = dateArray[3];
      this.reservYear = dateArray[5];
      this.reservHour = dateArray[8] + ' ' + dateArray[9];

    }
    else{
      this.reservDay = dateArray[0];
      this.reservMonth = dateArray[2];
      this.reservYear = dateArray[4];
      this.reservHour = dateArray[7] + ' ' + dateArray[8];
    }
        
    for(let i = 0; i < 12; i++) {
      if(this.changeNumberToNameMonth(i) == this.reservMonth)
        this.reservMonth = (i + 1).toString();
    }
    let user_id: any = localStorage.getItem('User');
    user_id = JSON.parse(user_id);
    user_id = user_id._id;
     
    this.nextReservation.forEach(element => {
      if(element != undefined)      
        if(element.cut_day == this.reservDay && element.cut_month == this.reservMonth && element.cut_year == this.reservYear)
          this.reservId = element._id;
    });
    
    this.showButtons();
    
  }

  showButtons() {
    this.showFormBoolean = false;
    this.changeBtns.nativeElement.style.display = 'block';
  }

  hideButtons() {
    this.changeBtns.nativeElement.style.display = 'none';
    this.editFormBoolean = false;
    this.showFormBoolean = false;
  }

  enableToEdit() {
    this.showFormBoolean = true;
    this.editFormBoolean = true;
  }

  delete() {
    this.reservationService.deleteReservation(this.reservId).subscribe(
      res => {
        console.log(res);
        this.hideButtons();
        this.getReservations();        
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  
}
