import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import { Reservation } from 'src/app/models/reservations';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css'],
  providers: [ReservationService]
})
export class ReservationFormComponent implements OnInit {

  public date: Date = new Date();
  private actualDay = this.date.getDate()
  private actualMonth = (this.date.getMonth() + 1);
  private actualYear = this.date.getFullYear();
  public actualDate: string = 'yyyy/mm/dd';
  public dataOk: boolean = false;
  public message: string = '';
  public days: Array<number> = [];
  public months: Array<string> = [];
  public years: Array<number> = [];
  public hours: Array<string> = [];
  public reservation: Reservation;
  public reservationDate: string = '';

  @ViewChild('month') monthSelect!: ElementRef;
  @ViewChild('calendar') calendar!: ElementRef;
  
  @Output() refreshEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() editForm!: boolean;
  @Input() reservId!: string;

  constructor(
    private reservationService: ReservationService
  ) {
    this.reservation = new Reservation('', '', 0, 0, 0, '');
  }

  ngOnInit(): void {
    this.actualDate = this.setCalendarDate(this.actualYear, this.actualMonth, this.actualDay);    
  }
  ngAfterViewInit() {
    let calendar = this.calendar.nativeElement;
    calendar.value = this.actualDate;
    calendar.min = this.actualDate;
    calendar.max = this.setMaxCalendarDate(this.actualYear, this.actualMonth, this.actualDay);    
  }

  saveReservation(form: any) {
    
    if (this.reservationDate != '' && this.reservation.cut_hour != '') {
      let userId = JSON.parse(localStorage.getItem('User') || '{}');
      this.reservation.user_id = userId._id;
  
      this.date = new Date();
      this.reservation.date_reservation =
        this.date.getDate() + '-' +
        (this.date.getMonth() + 1) + '-' +
        this.date.getFullYear();
  
      let day: number = parseInt(this.reservationDate.substr(8));
      let month: string = this.changeNumberToNameMonth(parseInt(this.reservationDate.substr(5, 2)) - 1);
      let year: number = parseInt(this.reservationDate.substr(0, 4));          
  
      this.reservation.cut_day = day;
      this.reservation.cut_month = this.changeNameToNumberMonth(month);
      this.reservation.cut_year = year;

        if(!this.editForm) {  
                
          this.reservationService.saveReservation(this.reservation).subscribe(
            response => {
              console.log(response);
              this.refreshEvent.emit(true);
            },
            error => {
              console.log(<any>error);
            }
          );
          form.reset();      
  
          this.message = '';
        } else { 
          const reservationData = {
            reservation: this.reservation,
            id: this.reservId
          }
          this.reservationService.refreshReservation(reservationData).subscribe(
            response => {
              this.refreshEvent.emit(true);
            },
            error => {
              console.log(<any>error);
              this.message = 'Error al actualizar la reservación';
            }
          )
        }
  
      } else {
        this.message = 'Seleccione fecha y hora de reservación';
      }
    
    
  }

  setCalendarDate(year: number, month: any, day: number): string {
    if (month.toString().length < 2)
      month = '0' + month.toString();
    return year + '-' + month + '-' + day;
  }

  setMaxCalendarDate(year: number, month: any, day: number): string {
    const months: any = {
      13: 1,
      14: 2,
      15: 3,
      16: 4,
      17: 5,
      18: 6
    }
    month = month + 6;
    if (month > 12) {
      month = months[month];
      year++;
    }
    if (month.toString().length < 2)
      month = '0' + month.toString();
    return year + '-' + month + '-' + day;
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

  changeNameToNumberMonth(month: string) {
    const months: any = {
      "Enero": 1,
      "Febrero": 2,
      "Marzo": 3,
      "Abril": 4,
      "Mayo": 5,
      "Junio": 6,
      "Julio": 7,
      "Agosto": 8,
      "Septiembre": 9,
      "Octubre": 10,
      "Noviembre": 11,
      "Diciembre": 12
    }
    return months[month];
  }

  loadAvailableSchedules(event: any): void {
    this.hours = [];
    const schedules = [
      '02:00 p.m.', '02:20 p.m.', '02:40 p.m.',
      '03:00 p.m.', '03:20 p.m.', '03:40 p.m.',
      '04:00 p.m.', '04:20 p.m.', '04:40 p.m.',
      '05:00 p.m.', '05:20 p.m.', '05:40 p.m.',
      '06:00 p.m.', '06:20 p.m.', '06:40 p.m.',
      '07:00 p.m.', '07:20 p.m.', '06:40 p.m.',
      '08:00 p.m.', '08:20 p.m.', '08:40 p.m.',
      '09:00 p.m.', '09:20 p.m.'
    ];
    
    const date: string = event.target.value;
    const day = date.substr(8);
    const month = parseInt(date.substr(5, 2));
    const year = parseInt(date.substr(0, 4));
    
    this.reservationService.loadAvailableSchedules(month).subscribe(
      response => {

        let schedulesFound = response.reservatedSchedule.map((element: any) => {
          return { cut_hour: element.cut_hour, cut_day: element.cut_day };
        });
        schedulesFound = schedulesFound.sort();

         let newSchedulesFound: Array<string> = schedulesFound.map((element: any) => {
          if (element.cut_day == day) {
            return element.cut_day;
          }
        })
        
        newSchedulesFound.sort();

        if (newSchedulesFound[0] === day) {
                    
          let min = 0;
          let hour = '';

          for (let i = 2; i < 10; i++) {
            while (min < 50) {
              if (i < 10) {
                if (min < 20)
                  hour = '0' + i + ':0' + min + ' p.m.';
                else
                  hour = '0' + i + ':' + min + ' p.m.';
              }
              
              this.hours.push(hour);

              for (let item of schedulesFound) {
                if (item.cut_hour == hour)
                  this.hours.pop();
              }
              
              min += 20;              
            }
            min = 0;
          }
          
        } else {
          this.hours = schedules;
        }

      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
