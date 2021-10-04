import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { User } from '../../models/users';
import { UserService } from '../../services/User.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public title: string = 'Iniciar sesión';

  public login: User;
  public user_name: string = '';
  public email: string = '';
  public password: string = '';
  public passwordConfirm: string = '';
  public type: string = '';

  public dataOk: boolean = false;
  public message: string = '';

  private formType: string = 'access';
  public formLink: string = '';
  public buttonText: string = '';
  public okMessage: string = '';

  public date: Date = new Date;

  @Output() sessionNotify = new EventEmitter;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.login = new User('', '', '', '', 'user');
  }

  ngOnInit(): void {
    this.linkButtonChange();
  }

  onSubmit(form: any) {
    if(this.validateData(form)){

      if (this.buttonText == 'Entrar') {
  
        this.userService.login(this.login).subscribe(
          response => {  
            if (response.message == 'Data ok') {
              const sessionData: any = {
                date: this.date.getDate(),
                month: this.date.getMonth(),
                hour: this.date.getHours()
              };
              localStorage.setItem('session', JSON.stringify(sessionData));
              this.userService.addSession(response.user);
              this.sessionNotify.emit(true);          
              form.reset();
              let urlToNavigate = localStorage.getItem('prevUrl');
              localStorage.removeItem('prevUrl');
              this.router.navigate([urlToNavigate]);
            }
            else {
              this.dataOk = false;
              this.message = 'Usuario y/o contraseña incorrectos';
            }
  
          },
          error => {
  
            console.log({ Error: <any>error });
            this.dataOk = false;
            this.message = error.error.message;
  
          }
        );
  
      } else {
  
        if (form.value.passConfirm == this.login.password) {
          this.userService.register(this.login).subscribe(
            response => {
              console.log(response.message);
              this.linkButtonChange();
              this.okMessage = 'Usuario registrado correctamente';
              form.reset();
            },
            error => {
              this.message = error.error.message;
            }
          )
        } else {
          this.message = 'Las contraseñas no son validas';
        }
      }

    }
  }

  linkButtonChange() {
    if (this.formType == 'access') {
      this.formLink = 'Registrar usuario';
      this.buttonText = 'Entrar';
      this.formType = 'register';
    }
    else {
      this.formLink = 'Entrar';
      this.buttonText = 'Registrar usuario';
      this.formType = 'access';
    }
    this.message = '';
  }

  validateData(form: any): boolean {
    this.message = '';
    var errorUser = false;
    var errorEmail = false;

    const specialCharactersName: String = '@|°¬!"#$%&/()=?¡¿´+¨*{}[],.<>-;:_' + "'";

    const specialCharactersEmail: String = '"|°¬!"#$%&/()=?¡¿´+¨*{}[],<>;:'+"'";

    const data = form.form.value;

    for(let element in data) {
      data[element] = data[element].trim().toLowerCase();

        if(element == 'user'){

          for(let i = 0; i < specialCharactersName.length; i++) {
            for(let a = 0; a < data[element].length; a++) {
              if(data[element].charAt(a) == specialCharactersName.charAt(i))
                errorUser = true;
            }
          }

        }
        else if(element = 'email') {

          for(let i = 0; i < specialCharactersEmail.length; i++) {
            for(let a = 0; a < data[element].length; a++) {
              if(data[element].charAt(a) == specialCharactersEmail.charAt(i))
                errorEmail = true;
            }
          }

        }
    }

    if(errorUser)
      this.message = 'Error en Nombre';
    if(errorEmail)
      this.message = 'Error en Email';
    if(errorUser && errorEmail)
      this.message = 'Error en Nombre y en Email';

    if(this.message == '')
      return true;
    else
      return false;
  }
}
