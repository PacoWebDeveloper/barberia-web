import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScheduleService } from 'src/app/services/Schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  providers: [ScheduleService]
})
export class ScheduleComponent implements OnInit {

  public title: string = 'Horarios';
  public lunes: string = '';
  public martes: string = '';
  public miercoles: string = '';
  public jueves: string = '';
  public viernes: string = '';
  public sabado: string = '';
  public domingo: string = '';

  constructor(
    private scheduleService: ScheduleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllSchedules();
  }

  getAllSchedules(): void {
    this.scheduleService.getSchedules().subscribe(
      res => {
        const weekData = res.schedules;

        this.lunes = weekData[0].openHour + '  -  ' + weekData[0].closeHour; 
        this.martes = weekData[1].openHour + '  -  ' + weekData[1].closeHour;
        this.miercoles = weekData[2].openHour + '  -  ' + weekData[2].closeHour;
        this.jueves = weekData[3].openHour + '  -  ' + weekData[3].closeHour;
        this.viernes = weekData[4].openHour + '  -  ' + weekData[4].closeHour;
        this.sabado = weekData[5].openHour + '  -  ' + weekData[5].closeHour;
        this.domingo = weekData[6].openHour + '  -  ' + weekData[6].closeHour;

        weekData.forEach((element:any, index: number) => {
          if (!element.open) {
            switch (index) {
              case 0:
                this.lunes = 'Cerrado'                
                break;
              case 1:
                this.martes  ='Cerrado'
                break;
              case 2:
                this.miercoles = 'Cerrado'
                break;
              case 3:
                this.jueves  ='Cerrado'
                break;
              case 4:
                this.viernes = 'Cerrado';
                break;
              case 5:
                this.sabado = 'Cerrado';
                break;
              case 6:
                this.domingo = 'Cerrado';
                break;
            }
          }
        });
      },
      error => {
        console.log(<any>error);        
      }      
    );
  }

  gotoReservations(): void {
    this.router.navigate(['/reservaciones']);
  }

}
