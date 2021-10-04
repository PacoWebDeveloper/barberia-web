import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//========= COMPONENTS ===========
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { RecentWorksComponent } from './components/recent-works/recent-works.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { NoticesComponent } from './components/notices/notices.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/admin-components/dashboard/dashboard.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'bienvenida', component: WelcomeComponent},
  {path: 'horarios', component: ScheduleComponent},
  {path: 'trabajos-recientes', component: RecentWorksComponent},
  {path: 'reservaciones', component: ReservationsComponent},
  {path: 'avisos', component: NoticesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: '**', component: ErrorComponent}
];

export const AppRoutingProviders: any [] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes);