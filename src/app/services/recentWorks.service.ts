import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { recent } from "../models/recent";
import { Global } from "./global";

@Injectable()
export class RecentWorksService {
    public url: string;
    constructor(
        private _http: HttpClient
    ) {
        this.url = Global.url;
    }

    saveRecentWork(recent: recent): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type','application/json');
        let params = JSON.stringify(recent);

        return this._http.post(this.url + '/recent/saveRecentWork', params, {headers});
    }

    getRecentWorks(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type','application/json');
        
        return this._http.get(this.url + '/recent/getRecentWorks', {headers});
    }
}