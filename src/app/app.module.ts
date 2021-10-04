import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { routing, AppRoutingProviders } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { RecentWorksComponent } from './components/recent-works/recent-works.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { NoticesComponent } from './components/notices/notices.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';
import { DashboardComponent } from './components/admin-components/dashboard/dashboard.component';
import { AdminNoticesComponent } from './components/admin-components/admin-notices/admin-notices.component';
import { AdminSchedulesComponent } from './components/admin-components/admin-schedules/admin-schedules.component';
import { AdminReservationComponent } from './components/admin-components/admin-reservation/admin-reservation.component';
import { AdminRecentWorksComponent } from './components/admin-components/admin-recent-works/admin-recent-works.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ScheduleComponent,
    RecentWorksComponent,
    ReservationsComponent,
    NoticesComponent,
    ErrorComponent,
    LoginComponent,
    ReservationFormComponent,
    DashboardComponent,
    AdminNoticesComponent,
    AdminSchedulesComponent,
    AdminReservationComponent,
    AdminRecentWorksComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    routing
  ],
  providers: [AppRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
