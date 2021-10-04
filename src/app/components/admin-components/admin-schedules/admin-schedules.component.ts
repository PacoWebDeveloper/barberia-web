import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Schedule } from 'src/app/models/schedules';
import { ScheduleService } from 'src/app/services/Schedule.service';

@Component({
  selector: 'app-admin-schedules',
  templateUrl: './admin-schedules.component.html',
  styleUrls: ['./admin-schedules.component.css'],
  providers: [ScheduleService]
})
export class AdminSchedulesComponent implements OnInit {

  @ViewChild('noticeSpan') noticeSpan!: ElementRef;

  @ViewChild('alldays') allCheck!: ElementRef;
  @ViewChild('monday') mondayCheck!: ElementRef;
  @ViewChild('tuesday') tuesdayCheck!: ElementRef;
  @ViewChild('wednesday') wednesdayCheck!: ElementRef;
  @ViewChild('thursday') thursdayCkeck!: ElementRef;
  @ViewChild('friday') fridayCheck!: ElementRef;
  @ViewChild('saturday') saturdayCheck!: ElementRef;
  @ViewChild('sunday') sundayCkeck!: ElementRef;
  @ViewChild('openClose') openCloseCheck!: ElementRef;
  @ViewChild('openHoursSelect') openHourSelect!: ElementRef;
  @ViewChild('openMinutesSelect') openMinuteSelect!: ElementRef;
  @ViewChild('closeHoursSelect') closeHoursSelect!: ElementRef;
  @ViewChild('closeMinutesSelect') closeMinutesSelect!: ElementRef;

  public hours: Array<string> = [];
  public minutes: Array<string> = [];
  public showHourInfo: boolean = true;
  /* public daysList: Array<boolean> = [false]; */
  public all: boolean = false;
  public daysList: Array<any> = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]
  /* public message: string = ''; */
  public notice: any = {
    error: true,
    message: ''
  }

  public mondayModel: Schedule;
  public tuesdayModel: Schedule;
  public wednesdayModel: Schedule;
  public thursdayModel: Schedule;
  public fridayModel: Schedule;
  public saturdayModel: Schedule;
  public sundayModel: Schedule;

  public open: boolean = true;
  public hourSelected: string = '00';
  public minuteSelected: string = '00';
  public timeSelected: string = 'p.m.';
  public closeHourSelected: string = '00';
  public closeMinuteSelected: string = '00';
  public closeTimeSelected: string = 'p.m.';

  constructor(private scheduleService: ScheduleService) {
    this.mondayModel = new Schedule('Lunes', false, '', '');
    this.tuesdayModel = new Schedule('Martes', false, '', '');
    this.wednesdayModel = new Schedule('Miercoles', false, '', '');
    this.thursdayModel = new Schedule('Jueves', false, '', '');
    this.fridayModel = new Schedule('Viernes', false, '', '');
    this.saturdayModel = new Schedule('Sabado', false, '', '');
    this.sundayModel = new Schedule('Domingo', false, '', '');
  }

  ngOnInit(): void {
    this.setHours();
    this.setMinutes();
  }

  ngAfterInit(): void {
    this.noticeSpan.nativeElement.display = 'none';
  }

  onSubmit(): void {
    let daysListEmpty: boolean = true;

    for (const iterator of this.daysList) {
      if (iterator)
        daysListEmpty = false;
    }

    if (!daysListEmpty) {
      const openHourSelected: string = this.hourSelected + ':' + this.minuteSelected + ' ' + this.timeSelected;
      const closeHourSelected: string = this.closeHourSelected + ':' + this.closeMinuteSelected + ' ' + this.closeTimeSelected;
      let daysObject: any = {
        0: this.mondayModel,
        1: this.tuesdayModel,
        2: this.wednesdayModel,
        3: this.thursdayModel,
        4: this.fridayModel,
        5: this.saturdayModel,
        6: this.sundayModel
      }
      //Put the day info into respective model day
      for (let i = 0; i < 7; i++) {
        if (this.daysList[i]) {
          daysObject[i].open = this.open;
          daysObject[i].openHour = openHourSelected;
          daysObject[i].closeHour = closeHourSelected;
        }
        
      }
      if (this.openCloseCheck.nativeElement.checked) {
        //Send days models
        for (let i = 0; i < 7; i++) {
          if (this.daysList[i]) {
            this.scheduleService.updateSchedule(daysObject[i]).subscribe(
              response => {
                console.log(response);
              },
              error => {
                console.log(<any>error);
              }
            )
          }
        }
      } else {        
        //change open info and send it
        for (let i = 0; i < 7; i++) {
          if (this.daysList[i]) {
            daysObject[i].open = this.open;
            this.scheduleService.updateOpenClose(daysObject[i]).subscribe(
              response => {
                console.log(response);
              },
              error => {
                console.log(<any>error);
              }
            )
          }
        }
      }

      this.noticeFunction(false, 'Horarios actualizados correctamente');
      this.resetForm();
    }
    else {
      this.noticeFunction(true, 'Seleccione un día');
    }
  }

  allDaysSelected(checked: boolean): void {
    const isSelected: boolean = checked;

    if (isSelected) {
      this.mondayCheck.nativeElement.checked = true;
      this.tuesdayCheck.nativeElement.checked = true;
      this.wednesdayCheck.nativeElement.checked = true;
      this.thursdayCkeck.nativeElement.checked = true;
      this.fridayCheck.nativeElement.checked = true;
      this.saturdayCheck.nativeElement.checked = true;
      this.sundayCkeck.nativeElement.checked = true;
      for (let i = 0; i < 7; i++) {
        this.daysList[i] = true;
      }
    }
    else {
      this.mondayCheck.nativeElement.checked = false;
      this.tuesdayCheck.nativeElement.checked = false;
      this.wednesdayCheck.nativeElement.checked = false;
      this.thursdayCkeck.nativeElement.checked = false;
      this.fridayCheck.nativeElement.checked = false;
      this.saturdayCheck.nativeElement.checked = false;
      this.sundayCkeck.nativeElement.checked = false;
      for (let i = 0; i < 7; i++) {
        this.daysList[i] = false;
      }
    }
  }

  checkboxSelected(checkBoxChecked: boolean): void {
    if (checkBoxChecked) {
      if (this.allChecked())
        this.allCheck.nativeElement.checked = true;
    }
    else {
      this.allCheck.nativeElement.checked = false;
    }
  }

  allChecked(): boolean {
    if (
      this.mondayCheck.nativeElement.checked && this.tuesdayCheck.nativeElement.checked &&
      this.wednesdayCheck.nativeElement.checked && this.thursdayCkeck.nativeElement.checked &&
      this.fridayCheck.nativeElement.checked && this.saturdayCheck.nativeElement.checked &&
      this.sundayCkeck.nativeElement.checked
    )
      return true;

    return false;
  }

  showHourInfoFunction(checkBoxChecked: boolean): void {
    this.showHourInfo = checkBoxChecked;
  }

  setHours(): void {
    for (let i = 0; i <= 12; i++) {
      if (i < 10)
        this.hours[i] = '0' + i;
      else
        this.hours[i] = i.toString();
    }
  }
  setMinutes(): void {
    for (let i = 0; i <= 59; i++) {
      if (i < 10)
        this.minutes[i] = '0' + i;
      else
        this.minutes[i] = i.toString();
    }
  }

  resetForm(): void {
    this.allCheck.nativeElement.checked = false;
    this.openCloseCheck.nativeElement.checked = true;
    this.openHourSelect.nativeElement.value = '00';
    this.openMinuteSelect.nativeElement.value = '00';
    this.closeHoursSelect.nativeElement.value = '00';
    this.closeMinutesSelect.nativeElement.value = '00';
    this.allDaysSelected(false);
  }

  noticeFunction(type: boolean, message: string): void {
    if (type) {
      this.notice.error = true;
      this.notice.message = message;
      this.noticeSpan.nativeElement.classList.add('errorMessage');
      this.noticeSpan.nativeElement.classList.remove('successMessage');
    }
    else {
      this.notice.error = false;
      this.notice.message = message;
      this.noticeSpan.nativeElement.classList.add('successMessage');
      this.noticeSpan.nativeElement.classList.remove('errorMessage');
    }
  }
}
