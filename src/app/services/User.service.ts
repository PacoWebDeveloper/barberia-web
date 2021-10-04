import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { Global } from "./global";
import { User } from "../models/users";

@Injectable()
export class UserService {
    public url: string;
    constructor(
        private _http: HttpClient
    ) {
        this.url = Global.url;
    }

    register(user: User): Observable<any> {
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + '/login/register', params, { headers: headers });
    }
    login(user: User): Observable<any> {
        let params = JSON.stringify(user).toLowerCase();
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + '/login/access', params, { headers: headers });
    }

    addSession(user: User): void {
        localStorage.setItem('User', JSON.stringify(user));
    }

    auth_session(): any {
        let user = localStorage.getItem('User');
        if (user != undefined) {
            user = JSON.parse(user);
            return { session: true, user: user };
        }
        return false;
    }

    getClientName(id: string): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type','application/json');        

        return this._http.get(this.url + '/login/nombre/' + id, { headers });
    }
}