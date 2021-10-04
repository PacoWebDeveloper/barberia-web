import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'barberia-web';

  public userName: string = 'Iniciar sesión';
  public session: boolean = false;
  public url: string = '';
  public isAdmin : boolean = false;
  public date: Date = new Date;

  @ViewChild('settings') settings!: ElementRef; 
  
  constructor(
    public router: Router
  ) { }

  ngOnInit() { 

    const user = this.getUser();
    let sessionData: any = localStorage.getItem('session'); 
    sessionData = sessionData != null ? JSON.parse(sessionData) : false;

    if(sessionData){      
      if(sessionData.date < this.date.getDate() && sessionData.month == this.date.getMonth())
        this.logout();
      else if(sessionData.date > this.date.getDate() && sessionData.month != this.date.getMonth())
        this.logout();
      else if(sessionData.date == this.date.getDate() && sessionData.month == this.date.getMonth())
        this.session = true;
    }
      
    if(this.session)
      if(user) 
        this.userName = user.user.user;
    /* if(user) {
      this.userName = user.user.user;
      this.session = true;
    } */        
  }

  getUrl() {
    let route = window.location.href;
    route = route.substr(22);
    this.url = route;
  }  

  getUser(): any {
    let userStored = localStorage.getItem('User');
    if (userStored != undefined) {
      userStored = JSON.parse(userStored);
      return { user: userStored };
    }
  }

  login(): void {
    if(!this.session){
      this.getUrl();
      localStorage.setItem('prevUrl',this.url);
      this.router.navigate(['login']);
    }
  }

  logout(): void {
    if(this.session){
      localStorage.clear();
      this.session = false;
      this.router.navigate(['bienvenida']);
      location.reload();
    }
  }
  
  editProfile(): void {
    const jsonString = localStorage.getItem('User');
    let userData = {};
    if(jsonString)
      userData = JSON.parse(jsonString);
    
    const { type }: any = userData;
    if(type == 'admin') 
      this.router.navigate(['dashboard']);
  }
}
