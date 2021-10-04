import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { Global } from "./global";
import { Schedule } from "../models/schedules";


@Injectable()
export class ScheduleService {
    public url: string;
    constructor(
        private _http: HttpClient
    ) {
        this.url = Global.url;
    }

    getSchedules(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url + '/schedule/allSchedules', {headers});
    }

    updateSchedule(schedule: Schedule): Observable<any> {
        let params: string = JSON.stringify(schedule);
        let headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.put(this.url + '/schedule/' + params, {headers});
    }

    updateOpenClose(schedule: Schedule): Observable<any> {
        let params: string = JSON.stringify(schedule);
        let headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.put(this.url + '/schedule/open/' + params, {headers});
    }

}